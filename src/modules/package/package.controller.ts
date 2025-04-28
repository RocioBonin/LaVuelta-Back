import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Paquetes') 
@Controller('package')
export class PackageController {
    constructor( private readonly packageService: PackageService ) {}

    @ApiOperation({ summary: 'Obtener todos los paquetes' })
    @ApiResponse({ status: 200, description: 'Lista de paquetes obtenida exitosamente' })
    @Get()
    async getPackage() {
        return await this.packageService.getPackages();
    }

   /*  @ApiOperation({ summary: 'Crear un nuevo paquete' })
    @ApiResponse({ status: 201, description: 'Paquete creado exitosamente' })
    @Post()
    async createPackage(@Body() createPackageDto: CreatePackageDto) {
        return await this.packageService.createPackage(createPackageDto);
    } */

    @ApiOperation({ summary: 'Eliminar un paquete por ID' })
    @ApiResponse({ status: 200, description: 'Paquete eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
    @Delete(':id')
    async removePackage(@Param('id') id: string) {
        return await this.packageService.removePackage(id);
    }

    @ApiOperation({ summary: 'Actualizar un paquete por ID' })
    @ApiResponse({ status: 200, description: 'Paquete actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
    @Patch(':id')
      async updatePackage(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
        return await this.packageService.updatePackage(id, updatePackageDto);
    }

    @ApiOperation({ summary: 'Obtener un paquete por ID' })
    @ApiResponse({ status: 200, description: 'Paquete obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
    @Get(':id')
    async getPackageById(@Param('id') id: string) {
        return await this.packageService.packageById(id);
    }
}
