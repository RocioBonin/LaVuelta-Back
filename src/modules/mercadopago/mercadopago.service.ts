import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  private readonly client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
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
              unit_price: amount || 1 ,
            }
          ],
          back_urls: {
            success: 'https://lavueltalogistica.ver/success',
            failure: 'https://lavueltalogistica.ver/failure',
            pending: 'https://lavueltalogistica.ver/pending',
          },
          auto_return: 'approved', // Redirige automáticamente al cliente si el pago se aprueba
          metadata: {
            userId, // Información adicional asociada al usuario
          },
      }
     });
     
     return response.init_point;
 
    } catch (error) {
      console.error('Error al crear el enlace de pago:', error);
      throw new Error('No se pudo crear el enlace de pago');
    }
  }

  /**
   * Obtener detalles de un pago por ID
   * @param paymentId ID del pago
   * @returns Detalles del pago
   */
  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      // Crear instancia de Payment
      const payment = new Payment(this.client);

      // Obtener detalles del pago
      const paymentInfo = await payment.get({ id: paymentId });

      // Devolver los detalles del pago
      console.log('este es el detalle del pago' , paymentInfo);
      return paymentInfo;
    } catch (error) {
      console.error('Error al obtener detalles del pago:', error);
      throw new Error('No se pudo obtener los detalles del pago');
    }
  }
}



