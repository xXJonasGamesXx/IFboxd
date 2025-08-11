import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFilmeDto {
  @ApiProperty({
    description: 'O título do filme',
    example: 'O Senhor dos Anéis: A Sociedade do Anel',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'A descrição ou sinopse do filme',
    example: 'Um jovem hobbit herda um anel mágico...',
    required: false,
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'A data de lançamento do filme no formato ISO 8601',
    example: '2001-12-19T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  lancamento?: Date;

  @ApiProperty({
    description: 'O ID do usuário que está a adicionar o filme (do tipo UUID)',
    example: 'a3db5bbd-2f58-4f99-8310-be5b3ff0586d',
  })
  @IsUUID()
  criadorId: string;

  @ApiProperty({
    description: 'Uma lista de IDs dos gêneros associados a este filme',
    example: ['uuid-do-genero-1', 'uuid-do-genero-2'],
    required: false,
  })
  @IsUUID(undefined, { each: true })
  @IsOptional()
  generosIds?: string[];
}
