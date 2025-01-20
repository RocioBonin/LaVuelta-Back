import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        type: String,
        description: 'Identificador único para el usuario',
        example: 'e8c51d26-1b0d-4b12-9c67-2f4d9a0b2c5f',
      })
    id: string;

    @ApiProperty({
        type: String,
        example: 'John',
        description:
          'Indica el nombre del usuario, debe tener como mínimo 3 caracteres.',
      })
    name: string;

    @ApiProperty({
        type: String,
        example: 'Doe',
        description:
          'Indica el apellido del usuario, debe tener como mínimo 3 caracteres',
      })
    surname: string;

    @ApiProperty({
        type: String,
        example: 'john@example.com',
        description:
          'El email del usuario, debe ser un email válido',
      })
    email: string;

    @ApiProperty({
        type: String,
        description: 'Número de identificación del usuario',
        example: '12345678',
      })
    idNumber: string;

    @ApiProperty({
        type: String,
        description: 'Localidad del usuario',
        example: 'Argentina',
      })
    location: string;

    @ApiProperty({
        type: String,
        description: 'Número de télefono',
        example: '1134256282',
      })
    phone: string;

    @ApiProperty({
      type: Date,
        description: 'Fecha de nacimiento del usuario',
        example: '2025-01-03',
      })
    birthdate: Date;

    @ApiProperty({
        type: String,
        description: 'Rol del usuario',
        example: 'USER',
      })
      role: string;

    newsletter: boolean;

    constructor(partial: Partial<UserResponseDto>) {
        const { id, name, surname, email, idNumber, location, phone, birthdate, newsletter , role } = partial;

        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.idNumber = idNumber;
        this.location = location;
        this.phone = phone;
        this.birthdate = birthdate;
        this.newsletter = newsletter;
        this.role = role;
    }
}