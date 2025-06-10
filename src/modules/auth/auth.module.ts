import { Module } from "@nestjs/common";
import { AuthServices } from "./auth.service";
import { UsersModule } from "src/modules/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { AuthController } from "./auth.controller";

@Module({
    imports:[UsersModule, TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthServices]
})
export class AuthModule {}