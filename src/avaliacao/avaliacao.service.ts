// ARQUIVO: src/avaliacao/avaliacao.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAvaliacaoDto: CreateAvaliacaoDto) {
    const { usuarioId, filmeId, serieId, ...rest } = createAvaliacaoDto;

    // Verifica se o usuário já avaliou este item
    const avaliacaoExistente = await this.prisma.avaliacao.findFirst({
      where: {
        usuarioId,
        OR: [{ filmeId: filmeId || null }, { serieId: serieId || null }],
      },
    });

    if (avaliacaoExistente) {
      throw new ConflictException(
        'Este usuário já fez uma avaliação para este filme ou série.',
      );
    }

    // Cria a nova avaliação
    return this.prisma.avaliacao.create({
      data: {
        ...rest,
        usuario: { connect: { id: usuarioId } },
        // Conecta ao filme OU à série, dependendo de qual ID foi fornecido
        filme: filmeId ? { connect: { id: filmeId } } : undefined,
        serie: serieId ? { connect: { id: serieId } } : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.avaliacao.findMany({
      // Inclui os dados do usuário e do filme/série em cada avaliação
      include: {
        usuario: true,
        filme: true,
        serie: true,
      },
    });
  }

  async findOne(id: string) {
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: true,
        filme: true,
        serie: true,
      },
    });

    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com o ID '${id}' não encontrada.`);
    }

    return avaliacao;
  }

  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    await this.findOne(id); // Checa se a avaliação existe

    // A lógica de update aqui pode ser mais simples,
    // pois não permitimos mudar o filme, série ou usuário de uma avaliação.
    const { nota, comentario } = updateAvaliacaoDto;

    return this.prisma.avaliacao.update({
      where: { id },
      data: { nota, comentario },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.avaliacao.delete({ where: { id } });
  }
}