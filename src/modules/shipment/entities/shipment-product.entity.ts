import { Deposit } from "src/modules/deposit/entities/deposit.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shipment } from "./shipment.entity";

@Entity()
export class ShipmentProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Shipment, shipment => shipment.shipmentProducts, { onDelete: 'CASCADE' })
  shipment: Shipment;

  @ManyToOne(() => Deposit, { eager: true })
  product: Deposit;

  @Column({ type: 'int', unsigned: true })
  quantity: number;
}
