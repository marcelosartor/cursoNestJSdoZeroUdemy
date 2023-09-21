import { Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('token/:id')
  getToken(@Param('id') _id: string) {
    console.log('ok ');
    return this.authServices.generateJwt('1');
  }

  @Get('valid-token/:token')
  getValidToken(@Param('token') _token: string) {
    console.log('ok valid ');
    return this.authServices.verifyJwt(_token);
  }
}
