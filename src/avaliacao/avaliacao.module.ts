import { Module, forwardRef } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
})
export class AvaliacaoModule {}
