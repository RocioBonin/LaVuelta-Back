import { IsUUID, IsString, IsArray, ValidateNested, IsOptional, IsEnum, IsDate, IsNumber, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateShipmentProductDto } from './create-shipment-product.dto';
import { State } from '../enums/state.enum';
import { ShipmentType } from '../enums/shipment-type';

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
  @IsNumber()
  price?: number;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'deliveryDate debe estar en formato YYYY-MM-DD',
  })
  deliveryDate?: string;

  @IsEnum(ShipmentType)
  shipmentType: ShipmentType;

  @IsOptional()
  @IsEnum(State)
  status?: State;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateShipmentProductDto)
  products: CreateShipmentProductDto[];
}
