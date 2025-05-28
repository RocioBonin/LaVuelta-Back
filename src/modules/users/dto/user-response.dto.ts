import { Expose } from 'class-transformer';
import { Role } from '../enum/role.enum';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  dni: string;

  @Expose()
  address: string;

  @Expose()
  phone: string;

  @Expose()
  birthdate: Date;

  @Expose()
  company: string;

  @Expose()
  role: Role;
}
