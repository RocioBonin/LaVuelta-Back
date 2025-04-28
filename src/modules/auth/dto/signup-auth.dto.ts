import { ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";

export class SignUpAuthDto extends CreateUserDto {
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
    repeatPassword: string;
}