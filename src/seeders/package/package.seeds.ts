import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from 'src/modules/package/entities/package.entity';
import { State } from 'src/modules/package/enum/state.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/enum/role.enum';

@Injectable()
export class PackagesSeeds {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async run() {
    const users = await this.userRepository.find({ where: { role: Role.User } });

    const packages = [
      { packageNumber: 'PKG-100', receivedDate: new Date(2024, 3, 10) },
      { packageNumber: 'PKG-101', receivedDate: new Date(2024, 3, 11) },
      { packageNumber: 'PKG-102', receivedDate: new Date(2024, 3, 12) },
      { packageNumber: 'PKG-103', receivedDate: new Date(2024, 3, 13) },
      { packageNumber: 'PKG-104', receivedDate: new Date(2024, 3, 14) },
      { packageNumber: 'PKG-105', receivedDate: new Date(2024, 3, 15) },
      { packageNumber: 'PKG-106', receivedDate: new Date(2024, 3, 16) },
      { packageNumber: 'PKG-107', receivedDate: new Date(2024, 3, 17) },
      { packageNumber: 'PKG-108', receivedDate: new Date(2024, 3, 18) },
      { packageNumber: 'PKG-109', receivedDate: new Date(2024, 3, 19) },
    ];

    for (let i = 0; i < packages.length; i++) {
      const existing = await this.packageRepository.findOne({
        where: { packageNumber: packages[i].packageNumber },
      });

      if (existing) continue;

      const user = users[i]; // 1:1 relación con los usuarios definidos arriba

      const pkg = this.packageRepository.create({
        ...packages[i],
        clientName: `${user.fullname}`,
        status: State.DEPOSIT,
        user,
      });

      await this.packageRepository.save(pkg);
    }

    console.log('Paquetes cargados correctamente.');
  }
}


