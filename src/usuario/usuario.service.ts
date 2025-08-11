// ARQUIVO: src/usuario/usuario.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Role } from './enum/role.enum';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<Usuario | undefined> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  // --- MÉTODO CREATE COM A NOVA REGRA DE SEGURANÇA ---
  async create(
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<Omit<Usuario, 'senha'>> {
    // A propriedade 'role' é intencionalmente ignorada do DTO aqui.
    const { senha, ...rest } = createUsuarioDto;

    const hash = await bcrypt.hash(senha, 10);
    try {
      const usuarioCriado = await this.prisma.usuario.create({
        data: {
          ...rest,
          senha: hash,
          role: Role.VISITANTE, // Força a role para VISITANTE no momento do registro.
          perfil: {
            create: {},
          },
        },
      });
      const { senha: _, ...result } = usuarioCriado;
      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Este email já está em uso.');
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o usuário.',
      );
    }
  }

  async findAll(): Promise<Omit<Usuario, 'senha'>[]> {
    const usuarios = await this.prisma.usuario.findMany({
      include: {
        perfil: true,
      },
    });
    return usuarios.map(({ senha, ...result }) => result);
  }

  async findOne(id: string): Promise<Omit<Usuario, 'senha'>> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        perfil: true,
      },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID '${id}' não encontrado.`);
    }
    const { senha, ...result } = usuario;
    return result;
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Omit<Usuario, 'senha'>> {
    await this.findOne(id);
    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }
    try {
      const usuarioAtualizado = await this.prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto,
      });
      const { senha, ...result } = usuarioAtualizado;
      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Este email já está em uso.');
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o usuário.',
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.usuario.delete({ where: { id } });
  }
}
