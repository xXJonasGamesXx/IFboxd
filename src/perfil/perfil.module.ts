import { Module, forwardRef } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsuarioModule],
  controllers: [PerfilController],
  providers: [PerfilService],
})
export class PerfilModule {}
