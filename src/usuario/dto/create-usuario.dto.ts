// ARQUIVO: src/usuario/dto/create-usuario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// Note que não precisamos mais importar IsEnum, IsOptional ou Role aqui

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'O nome completo do usuário',
    example: 'Jorge Kleberson',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'O endereço de e-mail único do usuário',
    example: 'jorge.k@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário, com no mínimo 6 caracteres',
    example: 'senhaForte123',
  })
  @IsString()
  @MinLength(6)
  senha: string;

  // O campo 'role' foi removido daqui intencionalmente.
}
