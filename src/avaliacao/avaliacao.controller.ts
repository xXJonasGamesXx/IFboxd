// ARQUIVO: src/avaliacao/avaliacao.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('avaliacao')
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  // Quando reativarmos a segurança, esta rota será protegida com @UseGuards(JwtAuthGuard)
  // e pegaremos o `usuarioId` do token, em vez de recebê-lo no body.
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  // Esta rota será protegida e terá uma lógica para permitir que apenas o autor
  // da avaliação (ou um admin) possa editá-la.
  update(
    @Param('id') id: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  // Esta rota também será protegida da mesma forma que o update.
  remove(@Param('id') id: string) {
    return this.avaliacaoService.remove(id);
  }
}