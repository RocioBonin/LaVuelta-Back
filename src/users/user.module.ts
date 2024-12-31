import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { EmailModule } from "src/email/email.module";

@Module({
    imports:[TypeOrmModule.forFeature([User]), 
    EmailModule,
    ],
    controllers:[UserController],
    providers:[UserService],
})

export class UsersModule{}