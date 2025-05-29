import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator";

export class SignInAuthDto {
    @ApiProperty({
            type: String,
            required: true,
            example: 'john@example.com',
            description: 'El email del usuario, debe ser un email válido',
          })
          @IsEmail()
          @IsNotEmpty()
        emailSignIn: string;

        @ApiProperty({
          type: String,
          required: true,
          description: 'Contraseña del usuario',
          example: 'Jhon1234@',
        })
        @IsNotEmpty()
        @IsString()
        passwordSignIn: string;
}