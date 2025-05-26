/* import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UserService } from '../users/user.service';
import { UpdatePackageDto } from './dto/update-package.dto';
import { User } from 'mercadopago';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getPackages() {
    const packages = await this.packageRepository.find();

    if (!packages) throw new NotFoundException('Paquetes no encontrados');
    return packages;
  }

  async createPackage(createPackageDto: CreatePackageDto) {
    const { packageNumber } = createPackageDto;

    const existingPackage = await this.packageRepository.findOne({
      where: { packageNumber },
    });

    if (existingPackage) {
      throw new ConflictException(
        'El número de paquete ya se encuentra registrado',
      );
    }
    const newPackage = this.packageRepository.create({
      ...createPackageDto,
    });

    return await this.packageRepository.save(newPackage);
  }

  async removePackage(id: string) {
    const pkg = await this.packageById(id);

    await this.packageRepository.remove(pkg);
    return { message: 'Paquete eliminado correctamente.' };
  }

  async packageById(id: string) {
    const pkg = await this.packageRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!pkg) {
      throw new NotFoundException('Paquete no encontrado');
    }

    return pkg;
  }

  async updatePackage(id: string, updatePackageDto: UpdatePackageDto) {
    const pkg = await this.packageById(id);

    if (!pkg) {
      throw new NotFoundException(`Paquete con ID ${id} no encontrado`);
    }

    Object.assign(pkg, updatePackageDto);

    return await this.packageRepository.save(pkg);
  }

  async assignUser(packageId: string, userId: string): Promise<Package> {
    const pkg = await this.packageRepository.findOneBy({ id: packageId });
  
    if (!pkg) {
      throw new NotFoundException('Paquete no encontrado');
    }
  
    const user = await this.userRepository.findOne({where: {id: userId}})
  
    pkg.user = user;
    return await this.packageRepository.save(pkg);
  }
  
} */
