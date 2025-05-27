import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UserService } from '../users/user.service';
import { Deposit } from './entities/deposit.entity';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    private userService: UserService
  ) {}

  async getProducts() {
    const products = await this.depositRepository.find();

    if (!products) throw new NotFoundException('Productos no encontrados');
    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { company } = createProductDto;

    const user = await this.userService.getUserByCompanyName(company);

    if(company !== user.company) {
      throw new ConflictException('No coincide el nombre de la compañia');
    }

    const newProduct = this.depositRepository.create({
      ...createProductDto,
      customers: user
    });
    
    return await this.depositRepository.save(newProduct);
  }

  /* async removePackage(id: string) {
    const pkg = await this.packageById(id);

    await this.packageRepository.remove(pkg);
    return { message: 'Paquete eliminado correctamente.' };
  } */

  /* async packageById(id: string) {
    const pkg = await this.packageRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!pkg) {
      throw new NotFoundException('Paquete no encontrado');
    }

    return pkg;
  } */
}
