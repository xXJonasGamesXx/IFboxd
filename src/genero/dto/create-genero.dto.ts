import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty({
    description: 'O nome do gênero (Ex: Ação, Comédia, Terror)',
    example: 'Ficção Científica',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome: string;
}
