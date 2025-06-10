import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { UsersSeeds } from "./user/user.seeds";
import { Deposit } from "src/modules/deposit/entities/deposit.entity";
import { DepositSeeds } from "./deposit/deposit.seeds";

@Module({
    imports:[TypeOrmModule.forFeature([User, Deposit]),
    JwtModule,
],
    providers: [UsersSeeds, DepositSeeds],
    exports: [UsersSeeds],
})

export class SeedsModule {}