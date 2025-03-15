import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Role } from "../enum/role.enum";
import { Payment } from "src/modules/mercadopago/entities/payment.entity";
import { Package } from "src/modules/package/entities/package.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50})
    surname: string;

    @Column({ nullable : true })
    companyName?: string;

    @Column({ unique: true })
    idNumber: string;

    @Column()
    location: string;

    @Column({ unique: true })
    phone: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    birthdate: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @DeleteDateColumn()
    disabledAt?: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @Column({default: false})
    newsletter: boolean;

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[];
  
    @OneToMany(() => Package, (pkg) => pkg.user)
    packages: Package[];
}