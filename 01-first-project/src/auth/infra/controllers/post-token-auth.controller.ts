import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { PostTokenAuthService } from 'src/auth/services/post-token-auth.service';
import { Request } from 'express';

@Controller('auth/token')
export class PostTokenAuthController {
  constructor(private readonly postTokenAuthService: PostTokenAuthService) {}

  @Post()
  async generateToken(@Headers() pHeaders, @Body() pBody) {
    console.log(pHeaders);
    return await this.postTokenAuthService.generateJwt(pHeaders, pBody);
  }
}
