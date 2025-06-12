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
import { ShipmentType } from './enums/shipment-type';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
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
        deliveryDate: createShipmentDto.deliveryDate,
        customer,
      });

      if (shipment.shipmentType === ShipmentType.BRANCH) {
        shipment.price = 3750;
      } else {
        switch (shipment.province) {
          case 'CABA':
            shipment.price = 3750;
            break;
          case 'GBA 1':
            shipment.price = 4550;
            break;
          case 'GBA 2':
            shipment.price = 5550;
            break;
          case 'GBA 3':
            shipment.price = 7750;
            break;
          default:
            shipment.price = 3750;
        }
      }
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

  async getShipmentsByNameCompany(companyName: string) {
    const users = await this.userRepository.find({
      where: { company: companyName },
      relations: ['shipments', 'shipments.shipmentProducts', 'deposit'],
    });

    const shipments = users.flatMap((user) => user.shipments);

    return plainToInstance(ShipmentResponseDto, shipments, {
        excludeExtraneousValues: true,
      });
  }

  async findAll() {
    return await this.shipmentRepository.find({
      relations: ['customer', 'shipmentProducts', 'shipmentProducts.product'],
    });
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

  async updateStatus(shipmentId: string, status: State, date?: string | Date) {
  const shipment = await this.shipmentRepository.findOne({
    where: { id: shipmentId },
    relations: ['shipmentProducts', 'shipmentProducts.product'],
  });

  if (!shipment) {
    throw new NotFoundException('Envío no encontrado');
  }

  if (status === State.PACKAGING) {
    for (const sp of shipment.shipmentProducts) {
      const depositProduct = await this.depositRepository.findOne({
        where: { id: sp.product.id },
      });

      if (!depositProduct) {
        throw new NotFoundException(`Producto con ID ${sp.product.id} no encontrado`);
      }

      if (depositProduct.quantity < sp.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para el producto con ID ${sp.product.id}`,
        );
      }

      depositProduct.quantity -= sp.quantity;
      await this.depositRepository.save(depositProduct);
    }
  }

  shipment.status = status;

  if (status === State.DELIVERED) {
    shipment.deliveryDate = date ? new Date(date) : new Date();
  }

  await this.shipmentRepository.save(shipment);

  return { message: 'Estado actualizado correctamente' };
}

}
