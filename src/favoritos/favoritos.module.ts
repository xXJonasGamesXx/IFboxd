import { Module, forwardRef } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [FavoritosController],
  providers: [FavoritosService],
})
export class FavoritosModule {}
