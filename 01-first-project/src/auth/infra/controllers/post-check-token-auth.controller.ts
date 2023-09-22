import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostCheckTokenAuthService } from 'src/auth/services/post-check-token-auth.service';

@Controller('oauth/check_token')
export class PostCheckTokenAuthController {
  constructor(
    private readonly postCheckTokenAuthService: PostCheckTokenAuthService,
  ) {}

  @Post()
  async generateToken(@Body() pBody) {
    return await this.postCheckTokenAuthService.getCheckToken(pBody);
  }
}
