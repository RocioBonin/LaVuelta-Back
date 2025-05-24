import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  fullName: string;

  @Expose()
  company: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  birthdate: Date;
}
