import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersModule } from '../users/user.module';
import { UserService } from '../users/user.service';
import { EmailService } from '../email/email.service';
import { Deposit } from './entities/deposit.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit, User]), UsersModule],
  providers: [DepositService, UserService, EmailService],
  controllers: [DepositController]
})
export class DepositModule {}
