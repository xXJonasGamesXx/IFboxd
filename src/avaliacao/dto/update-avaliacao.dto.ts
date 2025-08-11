// ARQUIVO: src/avaliacao/dto/update-avaliacao.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAvaliacaoDto } from './create-avaliacao.dto';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {}