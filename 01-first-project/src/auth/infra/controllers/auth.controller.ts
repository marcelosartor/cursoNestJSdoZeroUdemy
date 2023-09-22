import { Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('token/:id')
  getToken(@Param('id') _id: string) {
    return this.authServices.generateJwt('1');
  }

  @Get('valid-token/:token')
  getValidToken(@Param('token') _token: string) {
    return this.authServices.verifyJwt(_token);
  }
}
