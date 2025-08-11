// ARQUIVO: src/perfil/perfil.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // Busca todos os perfis e inclui os dados do usuário dono de cada perfil
    return this.prisma.perfil.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: string) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id },
      include: {
        usuario: true, // Inclui o usuário dono do perfil
      },
    });

    if (!perfil) {
      throw new NotFoundException(`Perfil com o ID '${id}' não encontrado.`);
    }

    return perfil;
  }

  async update(id: string, updatePerfilDto: UpdatePerfilDto) {
    await this.findOne(id); // Checa se o perfil existe
    return this.prisma.perfil.update({
      where: { id },
      data: updatePerfilDto,
    });
  }

  // Não teremos um método 'create' ou 'remove' aqui, pois eles
  // são gerenciados pela criação e remoção de um Usuário.
}
