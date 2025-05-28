import { Expose } from 'class-transformer';

export class DepositResponseDto {
  @Expose()
  id: string;

  @Expose()
  product: string;

  @Expose()
  quantity: number;

  @Expose()
  company: string;
}
