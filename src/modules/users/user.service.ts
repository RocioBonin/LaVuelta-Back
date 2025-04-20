import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { EmailService } from 'src/modules/email/email.service';
import { emailHtml } from 'src/modules/email/templates/email-welcome';
import { Role } from './enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      idNumber,
      phone
    } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: [{ email }]});

    if (existingUser) {

      if (existingUser.email === email) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }

      if (existingUser.idNumber === idNumber) {
        throw new ConflictException(
          'El documento de identidad ya esta registrado',
        );
      }

      if(existingUser.phone === phone) {
        throw new ConflictException(
          'El número de celular ya se encuentra registrado',
        );
      };
    };

    const userDisabled = await this.userByEmailByDisabled(email);

    if(userDisabled?.disabledAt) {
      throw new ConflictException('El correo electrónico esta deshabilitado');
    }

    const hashedPassword = await hash(password, 10)

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);

    const message = emailHtml.replace('{{userName}}', newUser.name);
    const to = [newUser.email];
    const subject = 'Mensaje de bienvenida';

    await this.emailService.sendWelcomeEmail({ message, to, subject });

    return newUser;
  }

  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['packages']
    });
  }

  async getUserByRole(userRole: Role) {
    const user = await this.userRepository.find({
      where: { role: userRole }
    });

    if(!user) {
      throw new NotFoundException('No se encuentran usuarios con el rol ingresado');
    }

    return user;
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.findOne({
      where: [
        { name },    
        { companyName: name }
      ]
    });
  
    if (!user) {
      throw new NotFoundException("No se encontro un usuario con el nombre indicado.");
    }
  
    return user; 
  }
  
  async findEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async userByEmailByDisabled(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });
  
    return user; 
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  
    Object.assign(user, updateUserDto);
  
    return await this.userRepository.save(user); 
  }
  
  async removeUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.remove(user);
    return { message: 'Usuario eliminado correctamente.' };
  }

  async softDeleteUser(id: string) {
    await this.userRepository.softDelete(id);
    return { message: 'Se desactivo correctamente' };
  }

  async restore(id: string) {
    const user = await this.findDisabledUserById(id);
    if (user && user.disabledAt !== null) {
      await this.userRepository.restore(id);
      return { message: 'Se restauro correctamente' };
    }
    throw new BadRequestException('El usuario indicado ya se encuentra activo');
  }

  async findAllWhitDeleted() {
    return await this.userRepository.find({withDeleted:true});
  }

  async findDisabledUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId, disabledAt: Not(IsNull()) },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException('Usuario desactivado no encontrado');
    }

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}
