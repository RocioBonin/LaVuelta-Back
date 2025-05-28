import { IsUUID, IsString, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateShipmentProductDto } from './create-shipment-product.dto';
import { State } from '../enum/state.enum';

export class CreateShipmentDto {
  @IsUUID()
  customerId: string;

  @IsString()
  orderId: string;

  @IsString()
  company: string;

  @IsString()
  address: string;

  @IsString()
  locality: string;

  @IsString()
  postalCode: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsEnum(State)
  status?: State;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateShipmentProductDto)
  products: CreateShipmentProductDto[];
}
