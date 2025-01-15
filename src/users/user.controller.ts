import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SubscribeUserDto } from "src/email/dto/suscription-user.dto";


@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {}

    @ApiOperation({ summary: 'Obtiene todos los usuarios' })
    @Get() 
    @HttpCode(HttpStatus.OK)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Suscribe un usuario al newsletter' })
    @Post('suscribe')
    @HttpCode(HttpStatus.CREATED)
    suscribeUser( @Body() email: SubscribeUserDto ){
        return this.usersService.suscribeUser(email)
    }
}