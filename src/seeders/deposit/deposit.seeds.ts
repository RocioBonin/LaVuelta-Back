import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/users/enum/role.enum';
import { Deposit } from 'src/modules/deposit/entities/deposit.entity';

@Injectable()
export class DepositSeeds {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async run() {
    const users = await this.userRepository.find({ where: { role: Role.Customer } });

    const packages = [
      { product: 'Buzo', quantity: 1},
      { product: 'Remera', quantity: 2},
      { product: 'Pantalon', quantity: 4},
      { product: 'Campera', quantity: 5},
      { product: 'Gorra', quantity: 3},
      { product: 'Guante', quantity: 2},
      { product: 'Zapatilla', quantity: 6},
      { product: 'Bota', quantity: 3},
      { product: 'Jean', quantity: 10},
      { product: 'Short', quantity: 3},
    ];

    for (let i = 0; i < packages.length; i++) {
      const existing = await this.depositRepository.findOne({
        where: { product: packages[i].product },
      });

      if (existing) continue;

      const user = users[i]; // 1:1 relación con los usuarios definidos arriba

      const pkg = this.depositRepository.create({
        ...packages[i],
        company: `${user.company}`,
        customers: user,
      });

      await this.depositRepository.save(pkg);
    }

    console.log('Paquetes cargados correctamente.');
  }
}


