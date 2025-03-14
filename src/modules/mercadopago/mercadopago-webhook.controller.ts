import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Controller('webhooks')
export class MercadopagoWebhookController {
  constructor() {}

  @Post('mercadopago')
  async handleWebhook(@Req() req, @Res() res) {
    const { body, query } = req;

    console.log('Webhook recibido:', body);

    if (query.type === 'payment') {
      try {
        // Verifica el pago con la API de Mercado Pago usando el ID recibido
        const payment = await mercadopago.Payment.arguments(body.id);

        // Aquí procesas el estado del pago
        if (payment.body.status === 'approved') {
          console.log('Pago aprobado:', payment.body);
          // Puedes hacer cualquier acción, como actualizar la base de datos
        } else {
          console.log('Pago no aprobado:', payment.body);
        }
      } catch (error) {
        console.error('Error al consultar el pago:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error al procesar el pago');
      }
    }
    return res.status(HttpStatus.OK).send('OK');
  }
}


