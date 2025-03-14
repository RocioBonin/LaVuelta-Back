import { Controller, Post, Body, Get, Param, HttpException, HttpStatus} from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Post('create-link')
  async createPaymentLink(
    @Body('userId') userId: string,
    @Body('amount') amount: number
) {
    const paymentLink = await this.mercadopagoService.createPaymentLink(userId, amount);
    return { url: paymentLink };
  }

  @Get('get-payment-details/:paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: string) {
    try {
      const paymentDetails = await this.mercadopagoService.getPaymentDetails(paymentId);
      return paymentDetails;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus .INTERNAL_SERVER_ERROR);
    }
  }
}

