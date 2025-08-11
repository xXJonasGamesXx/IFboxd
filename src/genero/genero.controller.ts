// ARQUIVO: src/genero/genero.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GeneroService } from './genero.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard'; // <-- MUDANÇA AQUI
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../usuario/enum/role.enum';

@ApiTags('genero')
@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard) // <-- MUDANÇA AQUI
  @Roles(Role.ADMIN)
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generoService.create(createGeneroDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard) // <-- MUDANÇA AQUI
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateGeneroDto: UpdateGeneroDto) {
    return this.generoService.update(id, updateGeneroDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard) // <-- MUDANÇA AQUI
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.generoService.remove(id);
  }

  @Get()
  findAll() {
    return this.generoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generoService.findOne(id);
  }
}
