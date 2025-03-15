import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/enum/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Package } from 'src/modules/package/entities/package.entity';

@Injectable()
export class UsersSeeds {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>, // Inyecta el repositorio de Paqueteria
  ) {}

  async seedUsers() {
    const users = [
      {
        name: 'Jane',
        surname: 'Smith',
        companyName: null,
        email: 'admin@example.com',
        password: 'Admin123@',
        repeatPassword: 'Admin123@',
        idNumber: '123456',
        location: 'example',
        phone: '123456',
        birthdate: '03-08-1999',
        role: Role.Admin,
        packageNumber: '76549354',
      },
      {
        name: 'Jhon',
        surname: 'Doe',
        companyName: null,
        email: 'user1@example.com',
        password: 'User123@',
        repeatPassword: 'User123@',
        idNumber: '678910',
        location: 'example',
        phone: '123457',
        birthdate: '04-01-2001',
        newsletter: false,
        role: Role.User
      },
      {
        name: 'Claudio',
        surname: 'Martinez',
        companyName: 'Nike S.A',
        email: 'user2@example.com',
        password: 'User234@',
        repeatPassword: 'User234@',
        idNumber: '654634',
        location: 'example',
        phone: '123458',
        birthdate: '05-06-2003',
        newsletter: true,
        role: Role.User,
        packageNumber: '765435678',
      },
    ];

    try {
      for (const userData of users) {
        const { email, password, packageNumber, ...rest } = userData;

        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });

        if (!existingUser) {
          // Hashear la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);

          // Buscar el paquete por su número
          const pkg = await this.packageRepository.findOne({
            where: { packageNumber }, // Buscar por el número de paquete
          });

          // Si el paquete no se encuentra, ignorar este usuario
          if (!pkg) {
            console.error(`Paquete con número ${packageNumber} no encontrado.`);
            continue;
          }

          // Crear nuevo usuario
          const user = this.userRepository.create({
            ...rest,
            email,
            password: hashedPassword,
            packages: [pkg], // Asignar el paquete encontrado
          });

          // Guardar usuario en la base de datos
          await this.userRepository.save(user);
        }
      }

      console.log('Preload de usuarios exitoso!');
      
    } catch (error) {
      console.error('Error en la precarga de usuarios:', error);
    }
  }
}

