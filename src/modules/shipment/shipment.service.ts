import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShipmentDto } from './dto/shipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { Deposit } from '../deposit/entities/deposit.entity';
import { ShipmentProduct } from './entities/shipment-product.entity';
import { plainToInstance } from 'class-transformer';
import { ShipmentResponseDto } from './dto/shipment-response.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    @InjectRepository(ShipmentProduct)
    private readonly shipmentProductRepository: Repository<ShipmentProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createShipment(createShipmentDto: CreateShipmentDto) {
    const customer = await this.userRepository.findOne({
      where: { id: createShipmentDto.customerId },
    });
    if (!customer) throw new NotFoundException('Cliente no encontrado');

    const shipment = this.shipmentRepository.create({
      orderId: createShipmentDto.orderId,
      company: createShipmentDto.company,
      customerId: customer.id,
      status: createShipmentDto.status,
      address: createShipmentDto.address,
      locality: createShipmentDto.locality,
      postalCode: createShipmentDto.postalCode,
      province: createShipmentDto.province,
      customer,
    });

    const savedShipment = await this.shipmentRepository.save(shipment);

    const shipmentProducts = [];

    for (const p of createShipmentDto.products) {
      const depositProduct = await this.depositRepository.findOne({
        where: { id: p.depositId },
      });

      if (!depositProduct) {
        throw new NotFoundException(
          `Producto con ID ${p.depositId} no encontrado`,
        );
      }

      if (p.quantity <= 0) {
        throw new BadRequestException(
          `Cantidad inválida para el producto con ID ${p.depositId}`,
        );
      }

      if (depositProduct.quantity < p.quantity) {
        throw new ConflictException(
          `Stock insuficiente para ${depositProduct.product}`,
        );
      }

      depositProduct.quantity -= p.quantity;
      await this.depositRepository.save(depositProduct);

      const shipmentProduct = this.shipmentProductRepository.create({
        shipment: savedShipment,
        product: depositProduct,
        quantity: p.quantity,
      });

      const savedShipmentProduct =
        await this.shipmentProductRepository.save(shipmentProduct);
      shipmentProducts.push(savedShipmentProduct);
    }

    savedShipment.shipmentProducts = shipmentProducts;

    const result = await this.shipmentRepository.findOne({
      where: { id: savedShipment.id },
      relations: ['customer', 'shipmentProducts', 'shipmentProducts.product'],
    });

    return plainToInstance(ShipmentResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  findAll() {
    return `This action returns all shipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}
