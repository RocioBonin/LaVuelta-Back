import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import { Package } from "src/modules/deposit/entities/package.entity";
import { Exclude } from "class-transformer";

@Entity({name: 'users'})
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

    @Column({ type: 'enum', enum: Role, default: Role.Client })
    role: Role;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({default: false})
    newsletter: boolean;

    /* @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[]; */
  
    @OneToMany(() => Package, (pkg) => pkg.user)
    packages: Package[];
}