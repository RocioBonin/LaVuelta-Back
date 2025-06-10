import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Shipment } from './entities/shipment.entity';
import { ShipmentProduct } from './entities/shipment-product.entity';
import { Deposit } from '../deposit/entities/deposit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Shipment, ShipmentProduct, Deposit ])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
