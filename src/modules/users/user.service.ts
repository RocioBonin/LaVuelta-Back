import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/modules/email/email.service';
import { Role } from './enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { randomBytes } from 'crypto';
import { emailHtmlWithPassword } from '../email/templates/email.welcome';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, phone } = createUserDto;

    let plainPassword = password;

    const existingUser = await this.findEmail(email);

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }

      if (existingUser.phone === phone) {
        throw new ConflictException(
          'El número de celular ya se encuentra registrado',
        );
      }
    }

    plainPassword = randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const { password: _, ...rest } = createUserDto;

    const newUser = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const message = emailHtmlWithPassword
      .replace('{{userName}}', newUser.fullName)
      .replace('{{password}}', plainPassword);

    const to = [newUser.email];
    const subject = 'Tu cuenta ha sido creada en La Vuelta Logística';

    await this.emailService.sendWelcomeEmail({ message, to, subject });

    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByRole(userRole: Role) {
    if (!Object.values(Role).includes(userRole)) {
      throw new BadRequestException('Debe ingresar un rol válido');
    }

    const user = await this.userRepository.find({
      where: { role: userRole },
    });

    if (!user) {
      throw new NotFoundException(
        'No se encuentran usuarios con el rol ingresado',
      );
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByName(fullName: string) {
    const user = await this.userRepository.findOne({
      where: { fullName: fullName },
    });

    if (!user) {
      throw new NotFoundException(
        'No se encontro un usuario con el nombre indicado.',
      );
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserByCompanyName(company: string) {
    const user = await this.userRepository.findOne({
      where: { company: company },
      relations:['deposit']
    });

    if (!user) {
      throw new NotFoundException(
        'No se encontro un usuario con el nombre indicado.',
      );
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);

    Object.assign(user, updateUserDto);

    const updateUser = await this.userRepository.save(user);

    return plainToInstance(UserResponseDto, updateUser, {
      excludeExtraneousValues: true,
    });
  }

  async changePassword(userId: string, changePassDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const isPasswordValid = await bcrypt.compare(
      changePassDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta.');
    }

    if (changePassDto.newPassword !== changePassDto.repeatNewPassword) {
      throw new UnauthorizedException('Las contraseñas no coinciden.');
    }

    const hashedPassword = await bcrypt.hash(changePassDto.newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada correctamente' };
  }

  async deletedUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.remove(user);
    return { message: 'Usuario eliminado correctamente.' };
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async assignAdmin(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user.role === Role.Admin) {
      throw new ConflictException('El usuario ya es administrador');
    }

    user.role = Role.Admin;
    await this.userRepository.save(user);

    return { message: 'Rol de administrador asignado correctamente' };
  }

  async removeAdmin(userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user.role !== Role.Admin) {
      throw new ConflictException('El usuario no es administrador');
    }

    user.role = Role.Customer;
    await this.userRepository.save(user);

    return { message: 'Rol de administrador removido correctamente' };
  }
}
