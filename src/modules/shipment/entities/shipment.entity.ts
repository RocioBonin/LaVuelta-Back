import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enums/state.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { ShipmentProduct } from './shipment-product.entity';
import { ShipmentType } from '../enums/shipment-type';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  orderId: string;

  @Column()
  address: string;

  @Column()
  locality: string;

  @Column()
  postalCode: string;

  @Column()
  province: string;

  @Column()
  company: string;

  @Column()
  price: number;

  @Column()
  deliveryDate: Date;

  @Column({
    type: 'enum',
    enum: State,
    default: State.TO_BE_PACKED,
  })
  status: State;
  
  @Column({
    type: 'enum',
    enum: ShipmentType
  })
  shipmentType: ShipmentType; 

  @ManyToOne(() => User, user => user.shipments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column()
  customerId: string;

  @OneToMany(() => ShipmentProduct, sp => sp.shipment, { cascade: true, eager: true })
  shipmentProducts: ShipmentProduct[];
}			
