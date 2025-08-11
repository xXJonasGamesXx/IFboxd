// ARQUIVO: src/usuario/usuario.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'; // Importe o JwtService
import { ConfigService } from '@nestjs/config'; // Importe o ConfigService

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        // Precisamos fornecer todas as dependências que o AuthGuard e o RolesGuard usam.
        // Como são testes unitários, podemos fornecer mocks vazios.
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});