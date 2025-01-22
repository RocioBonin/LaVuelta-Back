import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UserSeeds } from "./users/users.seeds";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([User]),
    JwtModule,
],
    providers: [UserSeeds],
    exports: [UserSeeds],
})

export class SeedsModule {}