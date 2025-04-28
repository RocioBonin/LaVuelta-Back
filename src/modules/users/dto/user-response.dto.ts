import { Expose, Transform } from 'class-transformer';
import { Role } from '../enum/role.enum';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  fullname: string;

  @Expose()
  email: string;

  @Expose()
  idNumber: string;

  @Expose()
  phone: string;

  @Expose()
  location: string;

  @Expose()
  birthdate: Date;

  @Expose()
  role: Role;

  @Expose()
  newsletter: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  disabledAt: Date | null;

  @Expose()
  @Transform(({ obj }) => obj.disabledAt === null)
  isActive: boolean;
}
