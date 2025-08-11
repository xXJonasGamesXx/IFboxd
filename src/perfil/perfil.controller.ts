// ARQUIVO: src/perfil/perfil.controller.ts
import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('perfil')
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  // Quando reativarmos a segurança, esta rota será protegida com @UseGuards(JwtAuthGuard)
  // e terá uma lógica para garantir que apenas o dono do perfil (ou um admin) possa editá-lo.
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilService.update(id, updatePerfilDto);
  }

  // Não há rotas para POST (create) ou DELETE (remove) aqui,
  // pois a criação/remoção de um perfil está atrelada à de um usuário.
}
