import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { dbConfig } from './config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development.local',
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        
        const config = configService.get<TypeOrmModuleOptions>('postgres')
         
        if (!config) {
          throw new Error('Database configuration not found');
        }

        return config;
      },
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
