import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('UsuarioController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  // Limpa TODAS as tabelas na ordem correta antes de cada teste
  beforeEach(async () => {
    // 1. Limpa tabelas que dependem de outras
    await prisma.avaliacao.deleteMany({});
    await prisma.episodio.deleteMany({});

    // 2. Limpa as tabelas "intermediárias"
    await prisma.temporada.deleteMany({});
    await prisma.perfil.deleteMany({});

    // 3. Limpa tabelas que dependem apenas do Usuário (ou de nada)
    await prisma.filme.deleteMany({});
    await prisma.serie.deleteMany({});

    // 4. Finalmente, limpa a tabela de Usuários e Gêneros
    await prisma.usuario.deleteMany({});
    await prisma.genero.deleteMany({});
  }, 30000); // <-- AUMENTAMOS O TIMEOUT PARA 30 SEGUNDOS

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('/usuario (POST)', () => {
    it('deve criar um novo usuário com sucesso', () => {
      return request(app.getHttpServer())
        .post('/usuario')
        .send({
          nome: 'Usuário E2E',
          email: 'e2e@teste.com',
          senha: 'password123',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.email).toEqual('e2e@teste.com');
          expect(response.body.role).toEqual('VISITANTE');
          expect(response.body.senha).toBeUndefined();
        });
    });

    it('não deve criar um usuário com email duplicado (deve retornar 409)', async () => {
      // Cria o primeiro usuário
      await request(app.getHttpServer())
        .post('/usuario')
        .send({
          nome: 'Usuário Duplicado',
          email: 'duplicado@teste.com',
          senha: 'password123',
        })
        .expect(201);

      // Tenta criar o segundo com o mesmo email
      return request(app.getHttpServer())
        .post('/usuario')
        .send({
          nome: 'Outro Usuário',
          email: 'duplicado@teste.com',
          senha: 'anotherpassword',
        })
        .expect(409);
    });

    it('não deve criar um usuário com dados inválidos (senha curta)', () => {
      return request(app.getHttpServer())
        .post('/usuario')
        .send({
          nome: 'Usuário Inválido',
          email: 'invalido@teste.com',
          senha: '123',
        })
        .expect(400);
    });
  });
});
