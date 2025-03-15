import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcryptjs';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthServices {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtServices: JwtService,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    if (signUpAuthDto.password !== signUpAuthDto.repeatPassword) {
      throw new HttpException('Las contraseñas no coinciden', 400);
    }

    const user = await this.usersService.createUser(signUpAuthDto);

    return user;
    
  }

  async signIn(credentials: SignInAuthDto) {
    const user = await this.usersService.findEmail(credentials.emailSignIn);

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordMatching = await bcrypt.compare(
        credentials.passwordSignIn,
        user.password,
      );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtServices.sign(userPayload);

    return { token, user };
  }
}
