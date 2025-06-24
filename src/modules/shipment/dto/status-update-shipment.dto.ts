import { IsDateString, IsEnum, IsOptional, Matches } from 'class-validator';
import { State } from '../enums/state.enum';

export class StatusShipmentDto {
  @IsEnum(State)
  status: State;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date debe tener formato YYYY-MM-DD',
  })
  date?: string;
}
