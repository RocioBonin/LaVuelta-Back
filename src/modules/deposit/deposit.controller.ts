import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepositService } from './deposit.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Deposito') 
@Controller('deposit')
export class DepositController {
    constructor( 
        private readonly depositService: DepositService
     ) {}

    @ApiOperation({ summary: 'Obtener todos los productos en deposito' })
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
    @Get()
    async getProducts() {
        return await this.depositService.getProducts();
    }

    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto
    ) {
        return await this.depositService.createProduct(createProductDto);
    }

   /*  @ApiOperation({ summary: 'Eliminar un paquete por ID' })
    @ApiResponse({ status: 200, description: 'Paquete eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
    @Delete(':id')
    async removePackage(@Param('id') id: string) {
        return await this.packageService.removePackage(id);
    } */

    /* @ApiOperation({ summary: 'Obtener un paquete por ID' })
    @ApiResponse({ status: 200, description: 'Paquete obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
    @Get(':id')
    async getPackageById(@Param('id') id: string) {
        return await this.packageService.packageById(id);
    } */
}
