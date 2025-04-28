import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John Lenon',
    description:
      'Indica el nombre completo del usuario, debe tener como mínimo 3 caracteres.',
  })
  @IsString()
  @Length(3, 80)
  fullname: string;

  @ApiProperty({
    type: String,
    example: 'john@example.com',
    description:
      'Correo electrónico del usuario, debe cumplir con la estructura de un email.',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Número de identificación del usuario',
    example: '12345678',
  })
  @IsString()
  idNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Contraseña del usuario',
    example: 'Jhon1234@',
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Matches(/[!@#$%^&*]/, {
    message:
      'La contraseña debe contener al menos un carácter especial: !@#$%^&*',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Localidad del usuario',
    example: 'Argentina',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    type: String,
    description: 'Número de télefono',
    example: '1134256282',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '2025-01-03',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty({
    enum: Role,
    description: 'Rol asignado al usuario',
    default: Role.User,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    type: Boolean,
    description: 'Indica si el usuario esta suscripto al newsletter',
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  newsletter?: boolean;
}
