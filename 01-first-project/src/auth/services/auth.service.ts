import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}

  async generateJwt(userId: string): Promise<GenerateJwtProps> {
    const payload = { id: userId };
    const options = {};
    const accessToken = await this.jwtService.signAsync(payload, options);

    return { accessToken };
  }

  async verifyJwt(token: string) {
    const options = { secret: this.configService.getJwtSecret() };
    try {
      const valid = await this.jwtService.verifyAsync(token, options);
      return 'valido';
    } catch (error) {
      return 'invalido';
    }
  }
}
