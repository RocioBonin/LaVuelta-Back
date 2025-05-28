import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/shipment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo envío con productos seleccionados' })
  @ApiResponse({ status: 201, description: 'Envío creado correctamente' })
  @ApiResponse({ status: 404, description: 'Cliente o producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Stock insuficiente' })
  async createShipment(@Body() dto: CreateShipmentDto) {
    return await this.shipmentService.createShipment(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Trae todos los envíos' })
  async findAll() {
    return await this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(+id);
  }
}
