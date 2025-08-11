import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@teste.com' })
  @IsEmail({}, { message: 'Por favor, forneça um email válido.' })
  email: string;

  @ApiProperty({ example: 'senha_forte_admin' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;
}
