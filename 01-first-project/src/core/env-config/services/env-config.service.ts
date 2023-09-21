import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../domain/interfaces/env-config.interface';
import { ConfigService } from '@nestjs/config';
import { readdir } from 'node:fs/promises';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getDbHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  getDbPort(): number {
    return Number(this.configService.get<number>('DATABASE_PORT'));
  }
  getDbName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
  getDbUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
  getDbPassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

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
      case 'TEST':
        return ['.env.test'];
      default:
        return ['.env'];
    }
  }
}
