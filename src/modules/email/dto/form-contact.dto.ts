import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsNotEmpty, IsString } from "class-validator";

export class formContactDto {
  @ApiProperty({
    type: String,
    title: 'Remitente',
    description: 'Dirección del usuario',
    example: 'user1@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    type: String,
    title: 'Asunto',
    description: 'Nombre del usuario',
    example: 'Jhon',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    type: String,
    title: 'Mensaje',
    description: 'Contenido del mail',
    example: 'Pregunta acerca de precios',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}