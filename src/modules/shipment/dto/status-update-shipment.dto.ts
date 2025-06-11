import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { State } from "../enums/state.enum";

export class StatusShipmentDto {
    @IsEnum(State)
    status: State;

    @IsOptional()
    @IsDateString()
    date?: string; 
  }