import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mailPassword = configService.get<string>('MAIL_PASSWORD');
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: Number(configService.get<number>('EMAIL_PORT')),
            secure: false,
            auth: {
              user: configService.get<string>('MAIL_USERNAME'),
              pass: mailPassword ? mailPassword.replace(/_/g, ' ') : '',
            },
          },
          defaults: {
            from: 'Glu Logistica <logisticaglu@gmail.com>',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

