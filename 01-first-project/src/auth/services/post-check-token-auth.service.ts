import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';
import { ClientCredentialDto } from '../domain/dto/client-credential-dto';
import { AuthClient } from '../domain/enum/auth-client';

@Injectable()
export class PostCheckTokenAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}

  async getCheckToken(pBody): Promise<string> {
    const token = pBody['token'];
    const options = { secret: this.configService.getJwtSecret() };
    try {
      const valid = await this.jwtService.verifyAsync(token, options);
      return 'Token valido';
    } catch (error) {
      throw new HttpException(`[PR01]-Token Invalido`, HttpStatus.FORBIDDEN);
    }
  }
}
