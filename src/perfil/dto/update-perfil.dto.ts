// src/perfil/dto/update-perfil.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePerfilDto } from './create-perfil.dto';

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {}
