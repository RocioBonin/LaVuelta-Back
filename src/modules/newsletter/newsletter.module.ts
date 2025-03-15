import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscriber } from "./entities/suscriber.entity";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { EmailService } from "src/modules/email/email.service";
import { EmailModule } from "src/modules/email/email.module";
import { User } from "src/modules/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subscriber, User]),
    EmailModule
],
    controllers: [NewsletterController],
    providers: [NewsletterService, EmailService]
})

export class NewsletterModule{}