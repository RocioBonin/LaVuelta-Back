import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'subscribers' })
export class Subscriber {
  @ApiProperty({
    type: String,
    description: 'Identificador único del suscriptor',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Correo electrónico del suscriptor',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: Date,
    description: 'Fecha de suscripción',
  })
  @CreateDateColumn()
  subscribedAt: Date;
}
