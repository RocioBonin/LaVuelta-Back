import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Role } from './enum/role.enum';
import { RoleGuards } from 'src/common/guards/role.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  /* @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuards) */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Filtra usuarios por nombre' })
  /* @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuards) */
  @Get('byName')
  @HttpCode(HttpStatus.OK)
  async getUserByName(@Query('name') fullname: string) {
    return await this.userService.getUserByName(fullname);
  }

  @ApiOperation({ summary: 'Buscar usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id/byId')
  async findUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @ApiOperation({
    summary: 'Filtra usuarios por Rol, estos pueden ser Usuarios o Admin',
  })
  /* @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuards) */
  @Get('find-userRol')
  @HttpCode(HttpStatus.OK)
  async getUserByRole(@Query('role') userRole: Role) {
    return await this.userService.getUserByRole(userRole);
  }

  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Delete(':id')
  async deletedUser(@Param('id') id: string) {
    return await this.userService.deletedUser(id);
  }

  @ApiOperation({ summary: 'Asignar rol de Admin a un Usuario' })
  @Patch(':id/assign-admin')
  @HttpCode(HttpStatus.OK)
  async assignAdmin(@Param('id') userId: string) {
    return await this.userService.assignAdmin(userId);
  }

  @ApiOperation({ summary: 'Remueve el rol de Admin' })
  @Patch(':id/remove-rol-admin')
  @HttpCode(HttpStatus.OK)
  async removeAdmin(@Param('id') userId: string) {
    return await this.userService.removeAdmin(userId);
  }

  @ApiOperation({ summary: 'Cambia la contraseña del usuario' })
  @Patch(':id/changePass')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Param('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return await this.userService.changePassword(userId, changePasswordDto);
  }
}
