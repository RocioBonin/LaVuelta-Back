import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { ShipmentProductResponseDto } from './shipment-product-response.dto';

export class ShipmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  orderId: string;

  @Expose()
  address: string;

  @Expose()
  locality: string;

  @Expose()
  postalCode: string;

  @Expose()
  province: string;

  @Expose()
  company: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => UserResponseDto)
  customer: UserResponseDto;

  @Expose()
  @Type(() => ShipmentProductResponseDto)
  shipmentProducts: ShipmentProductResponseDto[];
}
