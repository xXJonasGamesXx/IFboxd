import { Module, forwardRef } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [GeneroController],
  providers: [GeneroService],
})
export class GeneroModule {}
