import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subscriber } from "./entities/suscriber.entity";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { EmailService } from "src/email/email.service";
import { EmailModule } from "src/email/email.module";
import { User } from "src/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subscriber, User]),
    EmailModule
],
    controllers: [NewsletterController],
    providers: [NewsletterService, EmailService]
})

export class NewsletterModule{}