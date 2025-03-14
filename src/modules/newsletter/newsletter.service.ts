import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/suscriber.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { SubscribeUserDto } from './dto/suscription-user.dto';
import { emailHtml } from 'src/modules/email/templates/email-welcome';
import { EmailService } from 'src/modules/email/email.service';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async subscribe(emailDto: SubscribeUserDto) {
    const { email } = emailDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      if (user.newsletter) {
        throw new ConflictException(
          'El usuario ya está suscrito al newsletter', 
        );
      }

      user.newsletter = true;
      await this.userRepository.save(user);
  
      return 'El usuario registrado fue suscripto al newsletter';
    } 

    const existingSubscriber = await this.subscriberRepository.findOneBy({
      email,
    });

    if (existingSubscriber) {
      throw new ConflictException('El correo ya está suscrito al newsletter');
    }

    const newSubscriber = this.subscriberRepository.create({ email });
    await this.subscriberRepository.save(newSubscriber);

    const message = emailHtml.replace('{{userName}}', 'Invitad@');
    const to = [newSubscriber.email];
    const subject = 'Mensaje de bienvenida';

    await this.emailService.sendWelcomeEmail({ message, to, subject });

    return 'Suscripción exitosa para invitado';
  }

  async getUsersSuscriber() {
    const registeredUsers = await this.userRepository.find({
      where: { newsletter: true },
      select: ['email'], 
    });

    const invitedUsers = await this.subscriberRepository.find({
      select: ['email'],
    });

    return [...registeredUsers, ...invitedUsers];
  }
}
