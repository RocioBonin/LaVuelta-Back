import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { User } from 'src/modules/users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MercadopagoWebhookController } from './mercadopago-webhook.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User, Payment]),],
  providers: [MercadopagoService],
  controllers: [MercadopagoController, MercadopagoWebhookController]
})
export class MercadopagoModule {}
