import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateShipmentDto } from './dto/shipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { Deposit } from '../deposit/entities/deposit.entity';
import { ShipmentProduct } from './entities/shipment-product.entity';
import { plainToInstance } from 'class-transformer';
import { ShipmentResponseDto } from './dto/shipment-response.dto';
import { StatusShipmentDto } from './dto/status-update-shipment.dto';
import { State } from './enums/state.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginateData } from 'src/common/utils/paginate-data';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    private readonly dataSource: DataSource,
  ) {}

  async createShipment(createShipmentDto: CreateShipmentDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = await queryRunner.manager.findOne(User, {
        where: { id: createShipmentDto.customerId },
      });
      if (!customer) {
        throw new NotFoundException('Cliente no encontrado');
      }

      const shipment = queryRunner.manager.create(Shipment, {
        orderId: createShipmentDto.orderId,
        company: createShipmentDto.company,
        customerId: customer.id,
        shipmentType: createShipmentDto.shipmentType,
        status: createShipmentDto.status,
        address: createShipmentDto.address,
        locality: createShipmentDto.locality,
        postalCode: createShipmentDto.postalCode,
        province: createShipmentDto.province,
        customer,
      });

      const savedShipment = await queryRunner.manager.save(shipment);
      const shipmentProducts: ShipmentProduct[] = [];

      for (const { depositId, quantity } of createShipmentDto.products) {
        if (quantity <= 0) continue;

        const depositProduct = await queryRunner.manager.findOne(Deposit, {
          where: { id: depositId },
        });

        if (!depositProduct) {
          throw new NotFoundException(
            `Producto con ID ${depositId} no encontrado`,
          );
        }

        const availableToSend = Math.min(depositProduct.quantity, quantity);
        depositProduct.quantity -= availableToSend;
        await queryRunner.manager.save(depositProduct);

        const shipmentProduct = queryRunner.manager.create(ShipmentProduct, {
          shipment: savedShipment,
          product: depositProduct,
          quantity: quantity,
        });

        const savedSP = await queryRunner.manager.save(shipmentProduct);
        shipmentProducts.push(savedSP);
      }

      if (shipmentProducts.length === 0) {
        throw new BadRequestException('El envío no contiene productos válidos');
      }

      await queryRunner.commitTransaction();

      const result = await this.shipmentRepository.findOne({
        where: { id: savedShipment.id },
        relations: ['customer', 'shipmentProducts', 'shipmentProducts.product'],
      });

      return plainToInstance(ShipmentResponseDto, result, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const [shipments, total] = await this.shipmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['customer', 'shipmentProducts', 'shipmentProducts.product'],
    });

    const data = plainToInstance(ShipmentResponseDto, shipments, {
      excludeExtraneousValues: true,
    });

    return paginateData(data, total, page, limit);
  }

  async remove(id: string) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
    });

    if (!shipment) {
      throw new NotFoundException('Envío no encontrado');
    }

    await this.shipmentRepository.remove(shipment);

    return { message: 'Envío elimiando exítosamente' };
  }

  async updateStatus(shipmentId: string, status: State) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId },
    });

    if (!shipment) {
      throw new NotFoundException('Envío no encontrado');
    }

    shipment.status = status;
    await this.shipmentRepository.save(shipment);
    return { message: 'Estado actualizado correctamente' };
  }
}
