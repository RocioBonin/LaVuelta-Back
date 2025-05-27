import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enum/state.enum';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  orderId: string;

  @Column()
  products: string;

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

  @Column({
    type: 'enum',
    enum: State,
    default: State.TO_BE_PACKED,
  })
  status: State; 

  @ManyToOne(() => User, user => user.shipments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: User;
}			
