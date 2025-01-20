import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Role } from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'users'})
export class User {
    @ApiProperty({
        type: String,
        description: 'Autogenerador uuid.',
      })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: String,
        description: 'Nombre del usuario',
    })
    @Column({ length: 50 })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Apellido del usuario',
      })
    @Column({ length: 50 , nullable: true})
    surname?: string;

    @ApiProperty({
        type: String,
        description: 'Documento de identidad del usuario',
      })
    @Column({ unique: true })
    idNumber: string;

    @ApiProperty({
        type: String,
        description: 'Localidad del usuario',
      })
    @Column({ nullable: true })
    location?: string;

    @ApiProperty({
        type: String,
        description: 'Número de télefono del usuario',
      })
    @Column({ nullable: true })
    phone?: string;

    @ApiProperty({
        type: Date,
        description: 'Fecha de nacimiento del usuario',
      })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' , nullable: true})
    birthdate?: Date;

    @ApiProperty({
        type: String,
        description: 'Correo electónico del usuario',
      })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        type: String,
        description: 'Contraseña del usuario',
      })
    @Column()
    password: string;

    @ApiProperty({
        enum: Role,
        description: 'Indica el rol del usuario',
        default: Role.User,
      })
    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @ApiProperty({
        type: Boolean,
        description:
          'Indica cuando el usuario esta suscripto al newsletter'
      })
    @Column({default: false})
    newsletter: boolean;
}