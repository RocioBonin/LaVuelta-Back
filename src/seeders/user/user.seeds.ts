import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { Package } from 'src/modules/package/entities/package.entity';
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
        fullname: 'Carlos Gomez',
        idNumber: '2345678990',
        location: 'Córdoba',
        phone: '222222',
        birthdate: new Date('1985-06-15'),
        email: 'admin@example.com',
        password: 'Admin123@',
        role: Role.Admin,
        newsletter: false,
      },
      {
        fullname: 'Laura Perez',
        idNumber: '34567890',
        location: 'Mendoza',
        phone: '3333333333',
        birthdate: new Date('1992-08-10'),
        email: 'laura@example.com',
        password: 'User234@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Ana Ruiz',
        idNumber: '56789012',
        location: 'Salta',
        phone: '55555555654',
        birthdate: new Date('1988-12-05'),
        email: 'ana@example.com',
        password: 'User456@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Tomas Vega',
        idNumber: '01234567',
        location: 'San Juan',
        phone: '1010101010',
        birthdate: new Date('1996-05-14'),
        email: 'tomas@example.com',
        password: 'User901@',
        role: Role.User,
        newsletter: false,
      },
      {
        fullname: 'Lucia Mendez',
        idNumber: '77777777',
        location: 'La Plata',
        phone: '4444444444',
        birthdate: new Date('1990-02-20'),
        email: 'lucia@example.com',
        password: 'User000@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Mariano Lopez',
        idNumber: '88888888',
        location: 'Rosario',
        phone: '5555555555444',
        birthdate: new Date('1987-07-19'),
        email: 'mariano@example.com',
        password: 'User111@',
        role: Role.User,
        newsletter: false,
      },
      {
        fullname: 'Julieta Salas',
        idNumber: '99999999',
        location: 'Buenos Aires',
        phone: '6666666666',
        birthdate: new Date('1991-11-11'),
        email: 'julieta@example.com',
        password: 'User222@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Ricardo Fernandez',
        idNumber: '66666666',
        location: 'Tucumán',
        phone: '7777777777',
        birthdate: new Date('1986-10-10'),
        email: 'ricardo@example.com',
        password: 'User333@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Valeria Campos',
        idNumber: '55555555',
        location: 'Neuquén',
        phone: '8888888888',
        birthdate: new Date('1993-03-03'),
        email: 'valeria@example.com',
        password: 'User444@',
        role: Role.User,
        newsletter: true,
      },
      {
        fullname: 'Ezequiel Martinez',
        idNumber: '44444444',
        location: 'Misiones',
        phone: '9999999999',
        birthdate: new Date('1989-05-05'),
        email: 'ezequiel@example.com',
        password: 'User555@',
        role: Role.User,
        newsletter: false,
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


