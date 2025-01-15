import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupAuthDto } from 'src/auth/dto/signup-auth.dto';
import { Auth0SignupDto } from 'src/auth/dto/auth0.dto';
import { v4 as uuid } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { emailHtml } from 'src/email/templates/email-welcome';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createUser(signUpUserDto: SignupAuthDto) {
    const {
      name,
      surname,
      email,
      password,
      idNumber,
      location,
      phone,
      birthdate,
    } = signUpUserDto;
    const emailExisting = await this.findEmail(email);

    if (emailExisting) {
      throw new ConflictException('Email ya existente');
    }

    const idNumberExisting = await this.userRepository.findOne({
      where: { idNumber },
    });

    if (idNumberExisting) {
      throw new ConflictException(
        'El documento de identidad ya esta registrado',
      );
    }

    const user = new User();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = password;
    user.idNumber = idNumber;
    user.location = location;
    user.phone = phone;
    user.birthdate = birthdate;
    user.newsletter = true;

    await this.userRepository.save(user);

    const message = emailHtml.replace('{{userName}}', user.name);
    const to = [user.email];
    const subject = 'Mensaje de bienvenida';

    await this.emailService.sendWelcomeEmail({ message, to, subject });

    return user;
  }

  async createUserFromAuth0(auth0Dto: Auth0SignupDto) {
    const { authId, email, name } = auth0Dto;

    const user = new User();
    (user.authId = authId),
      (user.email = email),
      (user.name = name),
      (user.password = uuid()),
      (user.idNumber = uuid()),
      await this.userRepository.save(user);

    return user;
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async findEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
