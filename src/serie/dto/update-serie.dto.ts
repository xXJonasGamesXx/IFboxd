// src/serie/dto/update-serie.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateSerieDto } from './create-serie.dto';

export class UpdateSerieDto extends PartialType(CreateSerieDto) {}
