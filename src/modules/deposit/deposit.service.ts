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

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    private userService: UserService,
  ) {}

  async getProducts() {
    const products = await this.depositRepository.find();

    if (!products) throw new NotFoundException('Productos no encontrados');
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
