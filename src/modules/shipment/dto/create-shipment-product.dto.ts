import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateShipmentProductDto {
  @IsUUID()
  depositId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
