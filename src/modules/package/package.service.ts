import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UserService } from '../users/user.service';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
    constructor(
        @InjectRepository(Package)
        private packageRepository: Repository<Package>,

        private readonly userService: UserService
    ) {}
    
    async getPackages() {
        const packages = await this.packageRepository.find({
            relations: ['user']
        });
        return packages;
    }

    async createPackage(createPackageDto: CreatePackageDto) {
        const { companyName, clientName, packageNumber } = createPackageDto;
      
        const searchTerm = companyName || clientName;
      
        if (!searchTerm) {
          throw new BadRequestException('Debe proporcionar un nombre de cliente o empresa');
        }

        const existingPackageNumber = await this.packageRepository.findOne({where: {packageNumber}});
        if( existingPackageNumber.packageNumber === packageNumber ) {
            throw new ConflictException(
                      'El número de paquete ya se encuentra registrado',
                    );
        }
      
        const user = await this.userService.getUserByName(searchTerm);
      
        const packageEntity = this.packageRepository.create({
          ...createPackageDto,
          user,
        });
      
        return await this.packageRepository.save(packageEntity);
    }

    async removePackage(id: string) {
        const pkg = await this.packageById(id);

        await this.packageRepository.remove(pkg);
        return { message: 'Usuario eliminado correctamente.' };
    }

    async packageById(id: string) {
        const pkg = await this.packageRepository.findOne({
            where: {id},
            relations: ['users']
        })

        if(!pkg) {
            throw new NotFoundException('Paquete no encontrado');
        }

        return pkg;
    }
      
    async updatePackage(id: string, updatePackageDto: UpdatePackageDto) {
        const pkg = await this.packageById(id)
      
        if (!pkg) {
          throw new NotFoundException(`Paquete con ID ${id} no encontrado`);
        }
      
        Object.assign(pkg, updatePackageDto);
      
        return await this.packageRepository.save(pkg); 
    }
}
