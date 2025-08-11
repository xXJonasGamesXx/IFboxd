// ARQUIVO: src/filme/filme.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    const { generosIds, ...rest } = createFilmeDto;

    // Adicionamos a URL do pôster aqui
    return this.prisma.filme.create({
      data: {
        ...rest,
        generos: {
          connect: generosIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    const filmes = await this.prisma.filme.findMany({
      include: {
        generos: true,
        criador: {
          select: {
            nome: true,
          },
        },
      },
    });

    return filmes.map((filme) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { criadorId, criador, ...restanteDoFilme } = filme;
      return restanteDoFilme;
    });
  }

  async findOne(id: string) {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
      include: {
        generos: true,
        criador: {
          select: {
            nome: true,
          },
        },
      },
    });

    if (!filme) {
      throw new NotFoundException(`Filme com o ID '${id}' não encontrado.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { criadorId, criador, ...restanteDoFilme } = filme;

    return restanteDoFilme;
  }

  async update(id: string, updateFilmeDto: UpdateFilmeDto) {
    const { generosIds, ...rest } = updateFilmeDto;
    await this.findOne(id);

    return this.prisma.filme.update({
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
    return this.prisma.filme.delete({ where: { id } });
  }

  async findAvaliacoes(id: string) {
    const filme = await this.findOne(id);

    return this.prisma.avaliacao.findMany({
      where: {
        filmeId: filme.id,
      },
      include: {
        usuario: true,
      },
    });
  }
}
