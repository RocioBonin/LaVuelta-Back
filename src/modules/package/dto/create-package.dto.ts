import { IsString, IsDate, IsEnum, IsOptional, IsNotEmpty, IsDateString} from 'class-validator';
import { State } from '../enum/state.enum';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  packageNumber: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  clientName: string;

  @IsNotEmpty()
  @IsDateString()
  receivedDate: Date;

  @IsOptional()
  @IsDateString()
  emissionDate?: Date;

  @IsOptional()
  @IsDateString()
  deliveryDate?: Date;

  @IsOptional()
  @IsEnum(State)
  status?: State;
}
