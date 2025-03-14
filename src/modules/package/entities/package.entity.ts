import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../enum/state.enum";
import { v4 as uuid } from 'uuid';
import { User } from "src/modules/users/entities/user.entity";

@Entity('packages')
export class Package {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ unique: true })
    packageNumber: string;

    @Column({ nullable: true })
    companyName?: string;

    @Column({ nullable: true })
    clientName?: string;

    @Column()
    receivedDate: Date;

    @Column({ nullable: true })
    emissionDate?: Date;

    @Column({ nullable: true })
    deliveryDate?: Date;

    @Column({type: 'enum', enum: State, default: State.PENDING})
    status: State;

    @ManyToOne(() => User, (user) => user.packages)
    user: User;
}
