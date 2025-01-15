import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enum/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeds {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async seed() {
    const users = [
      {
        name: 'Jane',
        surname: 'Smith',
        email: 'admin@example.com',
        password: 'Admin123@',
        repeatPassword: 'Admin123@',
        idNumber: '123456',
        location: 'example',
        phone: 123456,
        birthdate: '2025-01-03',
        role: Role.Admin,
      },
      {
        name: 'Jhon',
        surname: 'Doe',
        email: 'user1@example.com',
        password: 'User123@',
        repeatPassword: 'User123@',
        idNumber: '678910',
        location: 'example',
        phone: 123457,
        birthdate: '2025-01-04',
        newsletter: false,
        role: Role.User,
      },
      {
        name: 'Joe',
        surname: 'Martinez',
        email: 'user2@example.com',
        password: 'User234@',
        repeatPassword: 'User234@',
        idNumber: '654634',
        location: 'example',
        phone: 123458,
        birthdate: '2025-01-05',
        newsletter: true,
        role: Role.User,
      },
    ];

    try {
      for (const userData of users) {
        const { email, password, ...rest } = userData;

        const existingUser = await this.usersRepository.findOne({
          where: { email },
        });

        if (!existingUser) {

          //Hashear la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);

          //Crear nuevo usuario
          const user = this.usersRepository.create({
            ...rest,
            email,
            password: hashedPassword,
          });

          //Guardar usuario en la base de datos
          await this.usersRepository.save(user);
        }
      }

      console.log('Preload exitoso!');
      
    } catch (error) {
        console.error('Error en la precarga de usuarios:' , error);
    }
  }
}
