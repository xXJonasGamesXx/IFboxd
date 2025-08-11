// src/perfil/dto/create-perfil.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePerfilDto {
  @ApiProperty({
    description: 'A biografia do usuário, com no máximo 255 caracteres.',
    example: 'Amo filmes de terror e ficção científica.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'A biografia não pode ter mais de 255 caracteres.',
  })
  bio?: string;
}
