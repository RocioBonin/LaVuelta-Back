import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/modules/package/entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesSeeds {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async seedPackages() {
    const packages = [
      {
        packageNumber: '76549354',
        clientName: 'Jane Smith',
        receivedDate: '2001-01-03',
      },
      {
        packageNumber: '765435678',
        companyName: 'Nike S.A',
        receivedDate: '2001-01-04',
      },
    ];

    try {
      for (const packageData of packages) {
        const { packageNumber, ...rest } = packageData;

        const existingPackageNumber = await this.packageRepository.findOne({
          where: { packageNumber },
        });

        if (!existingPackageNumber) {
          const newPackage = this.packageRepository.create({
            ...rest,
            packageNumber: packageNumber,
          });

          await this.packageRepository.save(newPackage);
        }
      }

      console.log('Preload de paquetes exitoso!');
    } catch (error) {
      console.error('Error en la precarga de paquetes:', error);
    }
  }
}
