import { IsEnum } from "class-validator";
import { State } from "../enum/state.enum";

export class StatusShipmentDto {
    @IsEnum(State)
    status: State;
  }