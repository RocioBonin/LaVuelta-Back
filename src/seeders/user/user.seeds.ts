import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/enum/role.enum';

@Injectable()
export class UsersSeeds {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async run() {
    const users = [
      {
        fullName: 'Glu Logistica',
        email: 'logisticaglu@gmail.com',
        dni: '2345678990',
        password: 'Admin123@',
        address: 'Av. Juan Bautista Justo',
        phone: '1171826912',
        birthdate: new Date('2025-06-16'),
        company: '',
        role: Role.Admin
      }
    ];

    for (const data of users) {
      const exists = await this.userRepository.findOne({ where: { email: data.email } });
      if (exists) continue;

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.userRepository.create({
        ...data,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
    }

    console.log('Usuarios cargados correctamente.');
  }
}


