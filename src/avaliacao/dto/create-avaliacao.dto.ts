import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateAvaliacaoDto {
  @ApiProperty({
    description: 'A nota da avaliação (número inteiro de 1 a 5)',
    example: 5,
  })
  @IsInt()
  @Min(1, { message: 'A nota mínima é 1.' })
  @Max(5, { message: 'A nota máxima é 5.' })
  nota: number;

  @ApiProperty({
    description: 'O comentário (review) do usuário sobre a obra',
    example: 'Um dos melhores filmes de todos os tempos!',
    required: false,
  })
  @IsString()
  @IsOptional()
  comentario?: string;

  @ApiProperty({
    description: 'O ID do usuário que está fazendo a avaliação.',
    example: 'a3db5bbd-2f58-4f99-8310-be5b3ff0586d',
  })
  @IsUUID()
  usuarioId: string;

  @ApiProperty({
    description:
      'O ID do filme que está sendo avaliado. Forneça este campo OU o serieId.',
    example: 'uuid-do-filme-aqui',
    required: false,
  })
  @IsUUID()
  @ValidateIf((o) => !o.serieId) // Valide este campo apenas se serieId não for fornecido
  @IsNotEmpty({ message: 'Você deve fornecer um filmeId ou um serieId.' })
  filmeId?: string;

  @ApiProperty({
    description:
      'O ID da série que está sendo avaliada. Forneça este campo OU o filmeId.',
    example: 'uuid-da-serie-aqui',
    required: false,
  })
  @IsUUID()
  @ValidateIf((o) => !o.filmeId) // Valide este campo apenas se filmeId não for fornecido
  @IsNotEmpty({ message: 'Você deve fornecer um filmeId ou um serieId.' })
  serieId?: string;

  @ApiProperty({
    description: 'A data em que a obra foi assistida',
    required: false,
    example: '2025-08-03T18:25:43.511Z',
  })
  @IsDateString()
  @IsOptional()
  dataAssistido?: Date;

  @ApiProperty({
    description: 'Indica se o usuário está reassistindo a obra',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  reassistido?: boolean;

  @ApiProperty({
    description: 'Indica se a avaliação contém spoilers',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  contemSpoiler?: boolean;
}
