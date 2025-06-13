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
        password: 'NahuelGluLogistica!@',
        address: 'Córdoba',
        phone: '222222',
        birthdate: new Date('1985-06-15'),
        company: '',
        role: Role.Admin
      },
      {
        fullName: 'Nahuel Gando',
        email: 'gandonahuel@gmail.com',
        dni: '23456654364',
        password: 'NahuelAdminGando@',
        address: 'Córdoba',
        phone: '2225436',
        birthdate: new Date('1985-06-15'),
        company: '',
        role: Role.Admin
      },
      {
        fullName: 'Agustin Ancona',
        email: 'agustinanconadev@gmail.com',
        dni: '2345665436',
        password: 'Cucarachita@',
        address: 'Córdoba',
        phone: '22225436',
        birthdate: new Date('1985-06-15'),
        company: '',
        role: Role.Admin
      },
      {
        fullName: 'Rocio Bonin',
        email: 'rociobonindev@gmail.com',
        dni: '2345665432',
        password: 'Rochycapa3@',
        address: 'Córdoba',
        phone: '222255425',
        birthdate: new Date('1985-06-15'),
        company: '',
        role: Role.Admin
      },
      {
        fullName: 'Lautaro Gando',
        email: 'lautarogandodev@gmail.com',
        dni: '23653465654',
        password: 'Ganditocapo@',
        address: 'Córdoba',
        phone: '265373',
        birthdate: new Date('1985-06-15'),
        company: '',
        role: Role.Admin
      },
      {
        fullName: 'Laura Perez',
        email: 'laura@example.com',
        dni: '34567890',
        password: 'User234@',
        address: 'Mendoza',
        phone: '3333333333',
        birthdate: new Date('1992-08-10'),
        role: Role.Customer,
        company: 'Lauri',
        newsletter: true,
      },
      {
        fullName: 'Ana Ruiz',
        email: 'ana@example.com',
        password: 'User456@',
        dni: '56789012',
        address: 'Salta',
        phone: '55555555654',
        birthdate: new Date('1988-12-05'),
        role: Role.Customer,
        company: 'Ana Ruiz',
        newsletter: true,
      },
      {
        fullName: 'Tomas Vega',
        email: 'tomas@example.com',
        password: 'User901@',
        dni: '01234567',
        address: 'San Juan',
        phone: '1010101010',
        birthdate: new Date('1996-05-14'),
        company: 'Tomatito',
        role: Role.Customer
      },
      {
        fullName: 'Lucia Mendez',
        email: 'lucia@example.com',
        password: 'User000@',
        dni: '77777777',
        address: 'La Plata',
        phone: '4444444444',
        birthdate: new Date('1990-02-20'),
        company: 'Lucia Mendez',
        role: Role.Customer,
        newsletter: true,
      },
      {
        fullName: 'Mariano Lopez',
        email: 'mariano@example.com',
        password: 'User111@',
        dni: '88888888',
        address: 'Rosario',
        phone: '5555555555444',
        birthdate: new Date('1987-07-19'),
        company: 'Marianito',
        role: Role.Customer,
      },
      {
        fullName: 'Julieta Salas',
        dni: '99999999',
        address: 'Buenos Aires',
        phone: '6666666666',
        birthdate: new Date('1991-11-11'),
        email: 'julieta@example.com',
        password: 'User222@',
        company: 'Julieta Salas',
        role: Role.Customer,
        newsletter: true,
      },
      {
        fullName: 'Ricardo Fernandez',
        dni: '66666666',
        address: 'Tucumán',
        phone: '7777777777',
        birthdate: new Date('1986-10-10'),
        email: 'ricardo@example.com',
        password: 'User333@',
        company: 'Ricardito',
        role: Role.Customer,
        newsletter: true,
      },
      {
        fullName: 'Valeria Campos',
        dni: '55555555',
        address: 'Neuquén',
        phone: '8888888888',
        birthdate: new Date('1993-03-03'),
        email: 'valeria@example.com',
        password: 'User444@',
        company: 'Valeria',
        role: Role.Customer,
        newsletter: true,
      },
      {
        fullName: 'Ezequiel Martinez',
        dni: '44444444',
        address: 'Misiones',
        phone: '9999999999',
        birthdate: new Date('1989-05-05'),
        email: 'ezequielMartinez@example.com',
        password: 'User5556@',
        company: 'Ezequiel Martinez',
        role: Role.Customer,
      },
      {
        fullName: 'Eze Marquez',
        dni: '444543643',
        address: 'Misiones',
        phone: '99996543654',
        birthdate: new Date('1988-05-05'),
        email: 'ezequiel@example.com',
        password: 'User555@',
        company: 'Eze Marquez',
        role: Role.Customer,
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


