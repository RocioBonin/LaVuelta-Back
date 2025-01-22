import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { UserService } from "src/users/user.service";
import { hash, compare } from "bcryptjs";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { JwtService } from "@nestjs/jwt";

 @Injectable()
 export class AuthServices {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtServices: JwtService,
    ) {}

    async signUp(signupAuthDto: SignupAuthDto) {
        if(signupAuthDto.password !== signupAuthDto.repeatPassword) {
            throw new HttpException('Las contraseñas no coinciden', 400)
        }

        signupAuthDto.password = await hash(signupAuthDto.password, 10)
        await this.usersService.createUser(signupAuthDto)

        return signupAuthDto;
    }

    async signIn( credentials: SignInAuthDto ) {
        const user = await this.usersService.findEmail(credentials.email);

        if (!user) {
            throw new HttpException('Usuario no encontrado', 404);
        }

        const isPasswordMatching = await compare (
            credentials.password,
            user.password
        )

        if(!isPasswordMatching) {
            throw new HttpException(
                'Credenciales incorrectas',
                HttpStatus.UNAUTHORIZED
            )
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = this.jwtServices.sign(userPayload);

        return { token, user }
    }
 }