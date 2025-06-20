import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deposit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    product: string; 

    @Column({ type: 'int' })
    quantity: number;

    @Column({ length: 100 })
    company: string;

    @Column() 
    customerId?: string;

    @ManyToOne(() => User, user => user.deposit, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customerId' })
    customers: User;
}
