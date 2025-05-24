import { Expose, Transform } from 'class-transformer';
import { Role } from '../enum/role.enum';

export class UserResponseDto {
  @Expose()
  fullName: string;

  @Expose()
  company: string;

  @Expose()
  email: string;

  @Expose()
  dni: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  birthdate: Date;
}
