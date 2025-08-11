import { Module, forwardRef } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmeModule {}
