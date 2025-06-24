import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private readonly client: MercadoPagoConfig;

  constructor() {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) {
      throw new Error('Falta MERCADO_PAGO_ACCESS_TOKEN en las variables de entorno');
    }

    this.client = new MercadoPagoConfig({
      accessToken: token,
    });
  }

  async createPaymentLink(userId: string, amount: number) {
    try {
      const preference = new Preference(this.client);

      const response = await preference.create({
        body: {
          items: [
            {
              id: userId,
              title: 'Pago a la Empresa',
              quantity: 1,
              unit_price: amount || 1,
            },
          ],
          back_urls: {
            success: 'https://lavueltalogistica.ver/success',
            failure: 'https://lavueltalogistica.ver/failure',
            pending: 'https://lavueltalogistica.ver/pending',
          },
          auto_return: 'approved',
          metadata: {
            userId,
          },
        },
      });

      return response.init_point;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al crear el enlace de pago:', errorMessage);
      throw new InternalServerErrorException('No se pudo crear el enlace de pago');
    }
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      const payment = new Payment(this.client);
      const paymentInfo = await payment.get({ id: paymentId });
      console.log('Este es el detalle del pago:', paymentInfo);
      return paymentInfo;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al obtener detalles del pago:', errorMessage);
      throw new InternalServerErrorException('No se pudo obtener los detalles del pago');
    }
  }
}




