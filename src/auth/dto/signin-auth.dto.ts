import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SignInAuthDto {
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
}