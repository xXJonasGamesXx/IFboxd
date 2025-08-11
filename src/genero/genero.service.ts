import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';

@Injectable()
export class GeneroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGeneroDto: CreateGeneroDto) {
    try {
      return await this.prisma.genero.create({ data: createGeneroDto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Lida com o erro de nome de gênero duplicado (se você tiver @unique no schema)
        if (error.code === 'P2002') {
          throw new ConflictException('Um gênero com este nome já existe.');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.genero.findMany();
  }

  async findOne(id: string) {
    const genero = await this.prisma.genero.findUnique({ where: { id } });

    if (!genero) {
      throw new NotFoundException(`Gênero com o ID '${id}' não encontrado.`);
    }
    return genero;
  }

  async update(id: string, updateGeneroDto: UpdateGeneroDto) {
    await this.findOne(id); // Reutiliza a checagem se o gênero existe
    try {
      return await this.prisma.genero.update({
        where: { id },
        data: updateGeneroDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Um gênero com este nome já existe.');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id); // Reutiliza a checagem se o gênero existe
    return this.prisma.genero.delete({ where: { id } });
  }
}
