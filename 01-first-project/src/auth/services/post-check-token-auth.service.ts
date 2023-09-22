import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';

@Injectable()
export class PostCheckTokenAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}

  async getCheckToken(pBody): Promise<any> {
    const token = pBody['token'];

    const options = { secret: this.configService.getJwtSecret() };
    try {
      await this.getCheckTokenByToken(token);
      return 'Token valido!';
    } catch (error) {
      throw new HttpException(`[PR01]-Token Invalido`, HttpStatus.FORBIDDEN);
    }
  }

  async getCheckTokenByToken(token: string): Promise<any> {
    const options = { secret: this.configService.getJwtSecret() };
    try {
      return await this.jwtService.verifyAsync(token, options);
    } catch (error) {
      throw new HttpException(`[PR01]-Token Invalido`, HttpStatus.FORBIDDEN);
    }
  }
}
