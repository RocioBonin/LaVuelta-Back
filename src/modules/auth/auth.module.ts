import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { UsersModule } from "src/modules/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";

@Module({
    imports:[UsersModule, TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthServices]
})
export class AuthModule {}