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

    @ApiOperation({ summary: 'Sumar un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto sumado exitosamente' })
    @Post('increment/:id')
    async addProduct( @Param('id') productId: string ) {
        return await this.depositService.addProduct(productId);
    }

    @ApiOperation({ summary: 'Resta un producto' })
    @ApiResponse({ status: 201, description: 'Producto restado exitosamente' })
    @Post('decrement/:id')
    async decrementProduct( @Param('id') productId: string ) {
        return await this.depositService.decrementProduct(productId);
    }

    @ApiOperation({ summary: 'Eliminar un producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @Delete(':id')
    async removeProduct(@Param('id') productId: string) {
        return await this.depositService.removeProduct(productId);
    }

    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @Get(':id')
    async getProductById(@Param('id') productId: string) {
        return await this.depositService.productById(productId);
    }
}
