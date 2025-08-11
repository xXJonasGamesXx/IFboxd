// ARQUIVO: src/serie/serie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SerieService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSerieDto: CreateSerieDto) {
    const { generosIds, ...rest } = createSerieDto;

    return this.prisma.serie.create({
      data: {
        ...rest,
        generos: {
          connect: generosIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  findAll() {
    return this.prisma.serie.findMany({
      include: {
        generos: true,
      },
    });
  }

  async findOne(id: string) {
    const serie = await this.prisma.serie.findUnique({
      where: { id },
      include: {
        generos: true,
      },
    });

    if (!serie) {
      throw new NotFoundException(`Série com o ID '${id}' não encontrada.`);
    }

    return serie;
  }

  async update(id: string, updateSerieDto: UpdateSerieDto) {
    const { generosIds, ...rest } = updateSerieDto;
    await this.findOne(id);

    return this.prisma.serie.update({
      where: { id },
      data: {
        ...rest,
        generos: {
          set: generosIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.serie.delete({ where: { id } });
  }

  // ADICIONE ESTE NOVO MÉTODO
  async findAvaliacoes(id: string) {
    // Primeiro, usamos o findOne para garantir que a série existe.
    // Se não existir, ele já vai lançar o erro 404 para nós.
    const serie = await this.findOne(id);

    // Se a série existe, buscamos todas as avaliações que têm o serieId correspondente.
    return this.prisma.avaliacao.findMany({
      where: {
        serieId: serie.id,
      },
      // Opcional: Incluímos os dados do utilizador que fez cada avaliação
      include: {
        usuario: true,
      },
    });
  }
}
