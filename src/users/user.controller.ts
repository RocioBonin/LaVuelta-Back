import {  Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

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
}