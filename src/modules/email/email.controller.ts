import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { formContactDto } from './dto/form-contact.dto';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({ summary: 'Envia mails' })
  @Post('sendEmail')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Correo enviado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    try {
      const { from, to, subject, message } = sendEmailDto;
      return await this.emailService.sendEmail({ from, to, subject, message });
    } catch (error) {
      throw new Error(`Error enviando el correo: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Envia el formulario de contacto' })
  @Post('formContact')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Formulario enviado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async formContact(@Body() formContactDto: formContactDto) {
    try {
      const { from, subject, message } = formContactDto;
      return this.emailService.formContact({ from, subject, message });
    } catch (error) {
      throw new Error(`Error enviando el formulario: ${error.message}`);
    }
  }
}
