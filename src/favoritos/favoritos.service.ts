// ARQUIVO: src/favoritos/favoritos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritosService {
  constructor(private readonly prisma: PrismaService) {}

  async favoritarFilme(usuarioId: string, filmeId: string) {
    // Verifica se o usuário e o filme existem
    await this.prisma.usuario.findUniqueOrThrow({ where: { id: usuarioId } });
    await this.prisma.filme.findUniqueOrThrow({ where: { id: filmeId } });

    return this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        filmesFavoritos: {
          connect: { id: filmeId }, // Conecta o filme aos favoritos do usuário
        },
      },
    });
  }

  async desfavoritarFilme(usuarioId: string, filmeId: string) {
    await this.prisma.usuario.findUniqueOrThrow({ where: { id: usuarioId } });
    await this.prisma.filme.findUniqueOrThrow({ where: { id: filmeId } });

    return this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        filmesFavoritos: {
          disconnect: { id: filmeId }, // Desconecta o filme dos favoritos
        },
      },
    });
  }

  // Podemos criar lógicas similares para Séries
  async favoritarSerie(usuarioId: string, serieId: string) {
    await this.prisma.usuario.findUniqueOrThrow({ where: { id: usuarioId } });
    await this.prisma.serie.findUniqueOrThrow({ where: { id: serieId } });

    return this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        seriesFavoritas: {
          connect: { id: serieId },
        },
      },
    });
  }

  async desfavoritarSerie(usuarioId: string, serieId: string) {
    await this.prisma.usuario.findUniqueOrThrow({ where: { id: usuarioId } });
    await this.prisma.serie.findUniqueOrThrow({ where: { id: serieId } });

    return this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        seriesFavoritas: {
          disconnect: { id: serieId },
        },
      },
    });
  }

  async findFavoritosDoUsuario(usuarioId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: {
        filmesFavoritos: true, // Inclui a lista de filmes favoritos
        seriesFavoritas: true, // Inclui a lista de séries favoritas
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return {
      filmesFavoritos: usuario.filmesFavoritos,
      seriesFavoritas: usuario.seriesFavoritas,
    };
  }
}
