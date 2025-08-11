// ARQUIVO: src/favoritos/favoritos.controller.ts
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('favoritos')
@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  // A segurança aqui é crucial. Usamos o @Request() para pegar o usuário do token.
  @UseGuards(AuthGuard)
  @ApiBearerAuth() // Avisa o Swagger que esta rota precisa de um token
  @Post('filme/:filmeId')
  favoritarFilme(@Request() req, @Param('filmeId') filmeId: string) {
    const usuarioId = req.user.id; // Pega o ID do usuário logado
    return this.favoritosService.favoritarFilme(usuarioId, filmeId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('filme/:filmeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  desfavoritarFilme(@Request() req, @Param('filmeId') filmeId: string) {
    const usuarioId = req.user.id;
    return this.favoritosService.desfavoritarFilme(usuarioId, filmeId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('serie/:serieId')
  favoritarSerie(@Request() req, @Param('serieId') serieId: string) {
    const usuarioId = req.user.id;
    return this.favoritosService.favoritarSerie(usuarioId, serieId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('serie/:serieId')
  @HttpCode(HttpStatus.NO_CONTENT)
  desfavoritarSerie(@Request() req, @Param('serieId') serieId: string) {
    const usuarioId = req.user.id;
    return this.favoritosService.desfavoritarSerie(usuarioId, serieId);
  }

  // Rota para ver os favoritos de um usuário específico
  @Get('usuario/:usuarioId')
  findFavoritosDoUsuario(@Param('usuarioId') usuarioId: string) {
    return this.favoritosService.findFavoritosDoUsuario(usuarioId);
  }
}
