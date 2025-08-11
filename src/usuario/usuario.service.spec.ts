// ARQUIVO: src/usuario/usuario.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Role } from './enum/role.enum';
import { Prisma } from '@prisma/client';

// Criamos um "dublê" (mock) completo do PrismaService para simular o banco de dados
const mockPrismaService = {
  usuario: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Usamos nosso dublê
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    // Limpa o histórico de chamadas do mock antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('deve retornar um usuário se ele for encontrado', async () => {
      const mockUser = { id: 'some-uuid', email: 'teste@email.com' };
      // Quando o método findUnique for chamado, nosso mock deve retornar o mockUser
      mockPrismaService.usuario.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('some-uuid');

      // Verificamos se o resultado está correto e se o método do Prisma foi chamado
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 'some-uuid' },
        include: { perfil: true },
      });
    });

    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      // Configuramos o mock para retornar null, simulando um usuário não encontrado
      mockPrismaService.usuario.findUnique.mockResolvedValue(null);

      // Verificamos se o método lança a exceção esperada
      await expect(service.findOne('non-existent-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar e retornar um novo usuário com a role VISITANTE', async () => {
      const createDto = {
        nome: 'Novo User',
        email: 'novo@email.com',
        senha: 'password123',
      };
      const expectedUser = {
        id: 'new-uuid',
        ...createDto,
        role: Role.VISITANTE,
      };
      // Omitimos a senha no retorno, como o serviço faz
      const { senha, ...expectedResult } = expectedUser;

      mockPrismaService.usuario.create.mockResolvedValue(expectedUser);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      // Verifica se o Prisma foi chamado para criar o usuário com a role correta
      expect(mockPrismaService.usuario.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'novo@email.com',
            role: Role.VISITANTE, // A regra de negócio principal!
          }),
        }),
      );
    });

    it('deve lançar ConflictException se o email já estiver em uso', async () => {
      const createDto = {
        nome: 'Novo User',
        email: 'novo@email.com',
        senha: 'password123',
      };
      // Simulamos o erro P2002 (unique constraint failed) do Prisma
      mockPrismaService.usuario.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Erro', {
          code: 'P2002',
          clientVersion: '',
        }),
      );

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
