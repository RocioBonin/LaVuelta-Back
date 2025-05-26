import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";

@Entity('')
export class Deposit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    product: string; 

    @Column({ nullable: true })
    quantity: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    company: Date;

    @ManyToOne(() => User, (user) => user.packages)
    user: User;
}
