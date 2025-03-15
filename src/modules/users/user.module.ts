import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { EmailModule } from "src/modules/email/email.module";
import { Payment } from "src/modules/mercadopago/entities/payment.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User, Payment]), 
    EmailModule,
    ],
    controllers:[UserController],
    providers:[UserService],
    exports: [UserService]
})

export class UsersModule{}