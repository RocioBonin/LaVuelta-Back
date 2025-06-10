import { IsEnum } from "class-validator";
import { State } from "../enums/state.enum";

export class StatusShipmentDto {
    @IsEnum(State)
    status: State;
  }