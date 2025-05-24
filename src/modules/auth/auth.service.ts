import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcryptjs';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtServices: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpAuthDto: CreateUserDto) {
    return await this.usersService.createUser(signUpAuthDto);
  }

  async signIn({ emailSignIn, passwordSignIn }: SignInAuthDto) {
    const user = await this.userRepository.findOne({where: { email: emailSignIn } });

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordMatching = await bcrypt.compare(
        passwordSignIn,
        user.password,
      );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if(user.disabledAt){
      throw new HttpException(
        'Cuenta desactivada',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtServices.sign(userPayload);

    const userResponse = plainToInstance(UserResponseDto, user, {
          excludeExtraneousValues: true,
        });

      return {token, userResponse};
  }
}
