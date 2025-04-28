import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import { Package } from "src/modules/package/entities/package.entity";
import { Exclude } from "class-transformer";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    fullname: string;

    @Column({ unique: true })
    idNumber: string;

    @Column()
    location: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    birthdate: Date;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @Column({ type: 'timestamp', nullable: true })
    disabledAt: Date | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({default: false})
    newsletter: boolean;

    /* @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[]; */
  
    @OneToMany(() => Package, (pkg) => pkg.user)
    packages: Package[];
}