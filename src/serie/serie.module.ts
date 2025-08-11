import { Module, forwardRef } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
