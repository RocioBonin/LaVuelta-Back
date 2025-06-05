import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/modules/users/dto/user-response.dto';
import { ShipmentProductResponseDto } from './shipment-product-response.dto';

export class ShipmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  orderId: string;

  @Expose()
  @Type(() => ShipmentProductResponseDto)
  shipmentProducts: ShipmentProductResponseDto[];

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
  shipmentType: string;

  @Expose()
  status: string;

  @Expose()
  deliveryDate: Date;

  @Expose()
  price: number;

  @Expose()
  @Type(() => UserResponseDto)
  customer: UserResponseDto;
}
