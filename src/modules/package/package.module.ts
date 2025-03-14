import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { PackageService } from './package.service';
import { Package } from './entities/package.entity';
import { PackageController } from './package.controller';
import { UsersModule } from '../users/user.module';
import { UserService } from '../users/user.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package, User]), UsersModule],
  providers: [PackageService, UserService, EmailService],
  controllers: [PackageController]
})
export class PackageModule {}
