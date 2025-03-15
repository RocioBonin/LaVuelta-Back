import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthServices } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { SignUpAuthDto } from "./dto/signup-auth.dto";

@ApiTags('Autorización y Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServices) {}

  @ApiOperation({ summary: 'Registro del usuario' })
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signupAuthDto: SignUpAuthDto) {
    console.log('📌 Request recibido en signUp:', signupAuthDto);
    return await this.authService.signUp(signupAuthDto);
  }

    @ApiOperation({ summary: 'Autenticación del usuario y generación del token' })
    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    async signIn ( @Body() credentials: SignInAuthDto ) {
        return await this.authService.signIn( credentials )
    }
}