import { IsString, IsEnum, IsOptional, IsNotEmpty, IsDate} from 'class-validator';
import { State } from '../enum/state.enum';
import { Type } from 'class-transformer';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  packageNumber: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  receivedDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  emissionDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deliveryDate?: Date;

  @IsOptional()
  @IsEnum(State)
  status?: State;
}
