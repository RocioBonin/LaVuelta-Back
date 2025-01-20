import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { UsersModule } from "src/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { AuthStrategy } from "./auth.strategy";

@Module({
    imports:[UsersModule, TypeOrmModule.forFeature([User])],
    controllers:[AuthController],
    providers:[AuthServices, AuthStrategy]
})
export class AuthModule {}