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

        private readonly userService: UserService,
    ) {}
    
    async getPackages() {
        const packages = await this.packageRepository.find({
            relations: ['user']
        });

        if(!packages)  throw new NotFoundException('Paquetes no encontrados');
        return packages;
    }

    /* async createPackage(createPackageDto: CreatePackageDto) {
        const {clientName, packageNumber , userId} = createPackageDto;
      
        const searchTerm = companyName || clientName;
        if (!searchTerm) {
          throw new BadRequestException('Debe proporcionar un nombre de cliente o empresa');
        }
      
        const existingPackage = await this.packageRepository.findOne({
          where: { packageNumber },
        });
      
        if (existingPackage) {
          throw new ConflictException('El número de paquete ya se encuentra registrado');
        }
      
        const user = await this.userService.getUserById(userId);

        if(user.name === clientName) {
            const newPackage = this.packageRepository.create({
                ...createPackageDto,
                user,
              });
            
              return await this.packageRepository.save(newPackage);
        }

        throw new BadRequestException('El nombre proporcionado no coincide con el usuario indicado');
      } */
      

    async removePackage(id: string) {
        const pkg = await this.packageById(id);

        await this.packageRepository.remove(pkg);
        return { message: 'Paquete eliminado correctamente.' };
    }

    async packageById(id: string) {
        const pkg = await this.packageRepository.findOne({
            where: {id},
            relations: ['user']
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
