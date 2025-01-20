import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class SignupAuthDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'John',
        description: 'Indica el nombre del usuario, debe tener como mínimo 3 caracteres',
      })
      @IsString()
      @Length(3, 80)
      @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Doe',
        description: 'Indica el apellido del usuario, debe tener como mínimo 3 caracteres',
      })
    @IsString()
    @Length(3, 80)
    @IsNotEmpty()
    surname: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'john@example.com',
        description: 'El email del usuario, debe ser un email válido',
      })
      @IsEmail()
      @IsNotEmpty()
      @IsString()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Número de identificación del usuario',
        example: '12345678',
      })
      @IsString()
      @IsNotEmpty()
    idNumber: string;

    @ApiProperty({
        type: String,
        required: true,
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
      @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Confirmación de la contraseña',
        example: 'Password123!',
      })
      @IsString()
      @IsNotEmpty()
    repeatPassword: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Localidad del usuario',
        example: 'Argentina',
      })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Número de télefono',
        example: '1134256282',
      })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        required: true,
        description: 'Fecha de nacimiento del usuario',
        example: '2025-01-03',
      })
    @IsDateString()
    birthdate: Date;
}