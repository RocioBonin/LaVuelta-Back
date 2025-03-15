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
      passwordSignIn: string;
}