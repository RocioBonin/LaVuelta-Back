import { Expose, Type } from 'class-transformer';
import { DepositResponseDto } from 'src/modules/deposit/dto/deposit-response.dto';

export class ShipmentProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  quantity: number;

  @Expose()
  @Type(() => DepositResponseDto)
  product: DepositResponseDto;
}
