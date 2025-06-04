import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendEmailDto } from "./dto/send-email.dto";
import { formContactDto } from "./dto/form-contact.dto";

@Injectable()
export class EmailService {
    constructor( private mailerService: MailerService){}

    async sendEmail(SendEmailDto: SendEmailDto): Promise<string>{
        const { to, subject, message} = SendEmailDto
        await this.mailerService.sendMail({
            to: to,
            subject: subject,
            text: message,
        })

        return 'Correo electrónico enviado exitosamente.';
    }

    async sendWelcomeEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const { to, subject, message } = sendEmailDto;
        await this.mailerService.sendMail({
          to: to,
          subject: subject,
          html: message,
        });
      }

      async formContact(formContactDto: formContactDto) {
        const { from, subject, message } = formContactDto;
        await this.mailerService.sendMail({
          from: from,
          to: 'Glu Logistica <logisticaglu@gmail.com>',
          subject: subject,
          html: message,
        });

        return "Mensaje enviado con éxito"  
    }
}