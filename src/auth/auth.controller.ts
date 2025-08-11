// ARQUIVO: src/auth/auth.controller.ts
import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard as LocalAuthGuard } from '@nestjs/passport'; // Renomeamos para evitar conflito
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard'; // <-- MUDANÇA AQUI

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard('local')) // O guard de login continua o mesmo
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o login e retorna um token JWT' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard) // <-- MUDANÇA AQUI
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
