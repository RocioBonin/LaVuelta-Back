import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";

@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                auth: {
                  user: process.env.MAIL_USERNAME,
                  pass: process.env.MAIL_PASSWORD.replace(/_/g, ' '),
                },
              },
              defaults: {
                from: 'La Vuelta Logistica <codigototaldevs@gmail.com>',
              },
        })
    ],
    controllers:[EmailController],
    providers:[EmailService],
    exports:[EmailService]
})

export class EmailModule{}