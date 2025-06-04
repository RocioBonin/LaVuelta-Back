import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/shipment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusShipmentDto } from './dto/status-update-shipment.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @ApiOperation({ summary: 'Crear un nuevo envío con productos seleccionados' })
  @ApiResponse({ status: 201, description: 'Envío creado correctamente' })
  @ApiResponse({ status: 404, description: 'Cliente o producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Stock insuficiente' })
  @Post()
  async createShipment(@Body() dto: CreateShipmentDto) {
    return await this.shipmentService.createShipment(dto);
  }

  @ApiOperation({ summary: 'Obtener todos los envios de una empresa' })
  @ApiResponse({
    status: 200,
    description: 'Lista de envios obtenida exitosamente',
  })
  /* @UseGuards(AuthGuard) */
  @Get(':companyName')
  async getShipmentsByNameCompany(@Param('companyName') companyName: string) {
    return await this.shipmentService.getShipmentsByNameCompany(companyName);
  }

  @ApiOperation({ summary: 'Trae todos los envíos' })
  @Get()
  async findAll() {
    return await this.shipmentService.findAll();
  }

  @ApiOperation({ summary: 'Elimina un envío por id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shipmentService.remove(id);
  }

  @ApiOperation({ summary: 'Cambiar el estado del envío' })
  @ApiResponse({
    status: 200,
    description: 'El estado del envío ha sido actualizado correctamente',
  })
  @Patch(':id/status')
  async updateStatus(
    @Body() dto: StatusShipmentDto,
    @Param('id') shipmentId: string,
  ) {
    return await this.shipmentService.updateStatus(shipmentId, dto.status);
  }
}
