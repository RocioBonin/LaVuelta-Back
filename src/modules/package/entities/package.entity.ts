import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../enum/state.enum";
import { User } from "src/modules/users/entities/user.entity";

@Entity('packages')
export class Package {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    packageNumber: string;

    @Column({ nullable: true })
    companyName?: string;

    @Column({ nullable: true })
    clientName?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    receivedDate: Date;

    @Column({ nullable: true })
    emissionDate?: Date;

    @Column({ nullable: true })
    deliveryDate?: Date;

    @Column({type: 'enum', enum: State, default: State.DEPOSIT})
    status: State;

    @ManyToOne(() => User, (user) => user.packages)
    user: User;
}
