import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { AuthServices } from "./auth.service";
import { UserResponseDto } from "src/users/dto/response-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInAuthDto } from "./dto/signin-auth.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @ApiOperation({ summary: 'Registro del usuario' })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signupAuthDto: SignupAuthDto) {
    const newUser = await this.authService.signUp(signupAuthDto);
    return new UserResponseDto(newUser);
  }

    @ApiOperation({ summary: 'Autenticación del usuario y generación del token' })
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn ( @Body() credentials: SignInAuthDto ) {
        return await this.authService.signIn( credentials )
    }
}