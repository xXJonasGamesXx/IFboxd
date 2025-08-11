// ARQUIVO: src/filme/filme.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('filme')
@Controller('filme')
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Post()
  // Lembre-se: estamos deixando a segurança de fora por enquanto.
  // Mais tarde, adicionaremos aqui: @UseGuards(JwtAuthGuard, RolesGuard) e @Roles(...)
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmeService.create(createFilmeDto);
  }

  @Get()
  findAll() {
    return this.filmeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmeService.findOne(id);
  }

  @Get(':id/avaliacoes')
  findAvaliacoes(@Param('id') id: string) {
    return this.filmeService.findAvaliacoes(id);
  }

  @Patch(':id')
  // Mais tarde, adicionaremos a segurança aqui também.
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmeService.update(id, updateFilmeDto);
  }

  @Delete(':id')
  // E aqui também.
  remove(@Param('id') id: string) {
    return this.filmeService.remove(id);
  }
}
