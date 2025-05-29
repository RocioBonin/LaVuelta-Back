import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        type: String,
        description: 'Contraseña actual del usuario',
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
        description: 'Contraseña nueva del usuario',
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
      newPassword: string;

      @ApiProperty({
        type: String,
        description: 'Repetir contraseña nueva del usuario',
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
      repeatNewPassword: string;
}