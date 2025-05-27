import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deposit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20 })
    product: string; 

    @Column({ type: 'int', unsigned: true })
    quantity: number;

    @Column({ length: 20 })
    company: string;

    @ManyToOne(() => User, user => user.deposit, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customerId' })
    customers: User;
}
