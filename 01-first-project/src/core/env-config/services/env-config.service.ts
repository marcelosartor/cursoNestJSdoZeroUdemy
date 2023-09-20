import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../domain/interfaces/env-config.interface';
import { ConfigService } from '@nestjs/config';
import { readdir } from 'node:fs/promises';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getJwtExpiresInSeconds(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN'));
  }

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  static loadConfigEnv() {
    switch (process.env.NODE_ENV) {
      case 'PROD':
        return ['.env'];
      case 'DEV':
        return ['.env.dev'];
      case 'LOCAL':
        return ['.env.local'];
      default:
        return ['.env'];
    }
  }
}
