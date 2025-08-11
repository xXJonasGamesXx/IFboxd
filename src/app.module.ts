import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filme/filme.module';
import { SerieModule } from './serie/serie.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { PerfilModule } from './perfil/perfil.module';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsuarioModule,
    AuthModule,
    GeneroModule,
    FilmeModule,
    SerieModule,
    AvaliacaoModule,
    PerfilModule,
    FavoritosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
