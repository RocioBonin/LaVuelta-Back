import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { Package } from "src/modules/package/entities/package.entity";
import { UsersSeeds } from "./user/user.seeds";
import { PackagesSeeds } from "./package/package.seeds";

@Module({
    imports:[TypeOrmModule.forFeature([User, Package]),
    JwtModule,
],
    providers: [UsersSeeds, PackagesSeeds],
    exports: [UsersSeeds],
})

export class SeedsModule {}