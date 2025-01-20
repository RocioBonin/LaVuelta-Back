import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super({
      domain: process.env.AUTH0_DOMAIN.replace(/^https?:\/\//, ''),
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: ['openid', 'profile', 'email'],
    });

    console.log('Configuración de Auth0:', {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      callbackURL:
        process.env.CALLBACK_URL || 'http://localhost:3000/auth/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: any,
    done: Function,
  ) {
    try {
      console.log('Accediendo al perfil con el accessToken:', accessToken);
      console.log('Perfil recibido de Auth0:', profile);

      // Verificar si el perfil tiene la estructura correcta
      if (
        !profile ||
        !profile.id ||
        !profile.emails ||
        profile.emails.length === 0
      ) {
        console.error('Perfil de usuario inválido:', profile);
        return done(new Error('Perfil de usuario inválido'), false);
      }

      const user = {
        authId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      };

      let userExisting = await this.usersService.findEmail(user.email);

      if (!userExisting) {
        userExisting = await this.usersService.createUserFromAuth0(user);
      }

      const jwt = await this.jwtService.signAsync({
        authId: userExisting.authId,
        email: userExisting.email,
        name: userExisting.name,
        role: userExisting.role,
      });

      return done(null, userExisting, { tokens: jwt });
    } catch (err) {
      console.error('Error al procesar el perfil:', err); // Captura el error si falla alguna parte
      return done(err, false); // Pasar el error a la función de callback
    }
  }
}
