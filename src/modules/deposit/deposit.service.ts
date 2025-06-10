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
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async getProducts() {
    return await this.depositRepository.find();
  }

  async getProductsByNameCompany(companyName: string) {
    const user = await this.userRepository.find({
      where: { company: companyName },
      relations: ['deposit'],
    });

    const products = user.flatMap(user => user.deposit);

    return products;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { company } = createProductDto;

    const user = await this.userService.getUserByCompanyName(company);

    if (company !== user.company) {
      throw new ConflictException('No coincide el nombre de la compañia');
    }

    const existing = await this.depositRepository.findOne({
      where: {
        product: createProductDto.product,
        company: createProductDto.company,
      },
    });

    if (existing) {
      existing.quantity += createProductDto.quantity;

      const saved = await this.depositRepository.save(existing);
      const transformed = {
        ...saved,
        customers: plainToInstance(UserResponseDto, user, {
          excludeExtraneousValues: true,
        }),
      };

      return transformed;
    }

    const newProduct = this.depositRepository.create({
      ...createProductDto,
      customers: user,
    });

    return await this.depositRepository.save(newProduct);
  }

  async addProduct(productId: string) {
    const product = await this.productById(productId);
    product.quantity += 1;
    return await this.depositRepository.save(product);
  }

  async decrementProduct(productId: string) {
    const product = await this.productById(productId);
    product.quantity -= 1;
    return await this.depositRepository.save(product);
  }

  async removeProduct(productId: string) {
    const product = await this.productById(productId);

    await this.depositRepository.remove(product);
    return { message: 'Producto eliminado correctamente.' };
  }

  async productById(productId: string) {
    if (!productId || typeof productId !== 'string') {
      throw new BadRequestException('ID de producto inválido');
    }

    const existing = await this.depositRepository.findOne({
      where: { id: productId },
      relations: ['customers'],
    });

    if (!existing) {
      throw new NotFoundException('Producto no encontrado');
    }

    return existing;
  }
}
