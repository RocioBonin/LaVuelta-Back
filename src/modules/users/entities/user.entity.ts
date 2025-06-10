import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role.enum';
import { Deposit } from 'src/modules/deposit/entities/deposit.entity';
import { Exclude } from 'class-transformer';
import { Shipment } from 'src/modules/shipment/entities/shipment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  dni: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  address: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  birthdate: Date;

  @Column()
  company: string;

  @Column({ type: 'enum', enum: Role, default: Role.Customer })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: false })
  newsletter: boolean;

  @OneToMany(() => Deposit, (deposito) => deposito.customers)
  deposit: Deposit[];

  @OneToMany(() => Shipment, (shipment) => shipment.customer)
  shipments: Shipment[];
}
