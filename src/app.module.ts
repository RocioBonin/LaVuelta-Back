import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDataSourceConfig } from './config/data-source';
import { EmailModule } from './modules/email/email.module';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedsModule } from './seeders/seeds.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadopagoModule } from './modules/mercadopago/mercadopago.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { ShipmentModule } from './modules/shipment/shipment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
      load: [postgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        configService.get('postgres'),
    }),
    EmailModule,
    UsersModule,
    AuthModule,
    SeedsModule,
    NewsletterModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '30d' },
      secret: process.env.JWT_SECRET,
    }),
    MercadopagoModule,
    DepositModule,
    ShipmentModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
