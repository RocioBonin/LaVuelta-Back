import { IsUUID, IsNotEmpty } from 'class-validator';

export class AssignUserToPackageDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
