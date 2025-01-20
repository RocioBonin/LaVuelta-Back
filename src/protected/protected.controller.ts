import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard('auth0'))
  getProtected(@Req() req) {
    return {
      message: '¡Bienvenido!',
      user: req.user,
    };
  }
}