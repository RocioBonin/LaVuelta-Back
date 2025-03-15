import {  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Role } from "./enum/role.enum";
import { RoleGuards } from "src/common/guards/role.guard";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Obtiene todos los usuarios' })
    /* @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuards) */
    @Get() 
    @HttpCode(HttpStatus.OK)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Filtra usuarios por Rol, estos pueden ser Usuarios, Admin o Transportistas' })
    /* @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuards) */
    @Get('find-userRol')
    @HttpCode(HttpStatus.OK)
    async getUserByRole(@Body('role') userRole: Role) {
        return await this.userService.getUserByRole(userRole)
    }

    @ApiOperation({ summary: 'Filtra usuarios por nombre' })
    /* @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuards) */
    @Get('byName')
    @HttpCode(HttpStatus.OK)
    async getUserByName( @Query('name') name: string ) {
        return await this.userService.getUserByName(name)
    }

  @ApiOperation({ summary: 'Obtener todos los usuarios, incluidos los desactivados' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida.', type: [User] })
  @Get('/findAllWhitDeleted')
  async findAllWhitDeleted() {
    return await this.userService.findAllWhitDeleted();
  }

  @ApiOperation({ summary: 'Buscar usuario desactivado por ID' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuario desactivado no encontrado.' })
  @Get('/findDisabledById/:id')
  async findDisabledUserById(userId: string) {
    return await this.userService.findDisabledUserById(userId);
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
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
    async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Desactivar usuario (soft delete)' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado correctamente.' })
  @Delete('/disabled/:id')
  async softDeleteUser(@Param('id') id: string) {
    return await this.userService.softDeleteUser(id);
  }

  @ApiOperation({ summary: 'Restaurar usuario desactivado' })
  @ApiResponse({ status: 200, description: 'Usuario restaurado correctamente.' })
  @ApiResponse({ status: 400, description: 'El usuario ya se encuentra activo.' })
  @Put('/restore/:id')
  async restore(@Param('id') id: string) {
    return await this.userService.restore(id);
  }
}