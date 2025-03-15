import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentId: string; // ID del pago en Mercado Pago

  @Column()
  status: string; // Estado del pago (approved, pending, rejected)

  @ManyToOne(() => User, (user) => user.payments)
  user: User; // Relación con el usuario
}
