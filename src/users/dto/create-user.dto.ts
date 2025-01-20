import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John',
    description:
      'Indica el nombre del usuario, debe tener como mínimo 3 caracteres.',
  })
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description:
      'Indica el apellido del usuario, debe tener como mínimo 3 caracteres',
  })
  @IsString()
  @Length(3, 80)
  surname: string;

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
    description: 'Contraseña del usuario',
    example: 'Password123!',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número, un caracter especial (= !@#$%^&*) y tener entre 8 y 15 caracteres',
    },
  )
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    type: String,
    description: 'Localidad del usuario',
    example: 'Argentina',
  })
  @IsString()
  location: string;

  @ApiProperty({
    type: Number,
    description: 'Número de télefono',
    example: '1134256282',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '2025-01-03',
  })
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    enum: Role,
    description: 'Rol asignado al usuario',
    default: Role.User,
    example: Role.User,
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
