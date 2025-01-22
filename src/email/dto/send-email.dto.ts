import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendEmailDto {
  @ApiProperty({
    type: String,
    title: 'Remitente',
    description: 'Dirección de correo electrónico del remitente del mensaje',
    example: 'notificaciones@logistica.com',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  from?: string;

  @ApiProperty({
    type: [String], 
    title: 'Destinatarios',
    description: 'Lista de direcciones de correo electrónico de los destinatarios del mensaje',
    example: ['user1@example.com', 'user2@example.com'],
  })
  @IsArray()
  @IsEmail({}, { each: true })
  @IsOptional()
  to?: string[];

  @ApiProperty({
    type: String,
    title: 'Asunto',
    description: 'Asunto descriptivo del mail',
    example: 'Notificación acerca de cambios en precios',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    type: String,
    title: 'Mensaje',
    description: 'Contenido del mail',
    example: 'Tenemos nuevos precios',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}