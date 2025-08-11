// src/serie/dto/create-serie.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSerieDto {
  @ApiProperty({ description: 'O título da série' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'A sinopse da série', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'A data de lançamento da série',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  lancamento?: Date;

  @ApiProperty({ description: 'O ID do usuário criador' })
  @IsUUID()
  criadorId: string;

  @ApiProperty({
    description: 'Uma lista de IDs dos gêneros da série',
    required: false,
  })
  @IsUUID(undefined, { each: true })
  @IsOptional()
  generosIds?: string[];
}
