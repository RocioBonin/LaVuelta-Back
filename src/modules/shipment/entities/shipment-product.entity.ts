import { Deposit } from 'src/modules/deposit/entities/deposit.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity()
export class ShipmentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @Column()
  shipmentId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.shipmentProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  @ManyToOne(() => Deposit, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Deposit;
}
