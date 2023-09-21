import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvConfigModule } from 'src/core/env-config/env-config.module';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';
import { AuthService } from 'src/auth/services/auth.service';

describe('AuthService unit tests', () => {
  let sut: AuthService;
  let module: TestingModule;
  let jwtService: JwtService;
  let envConfigService: EnvConfigService;
  let configService: ConfigService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EnvConfigModule, JwtModule],
      providers: [AuthService],
    }).compile();
  });

  beforeEach(async () => {
    jwtService = new JwtService({
      global: true,
      secret: 'fake_secret',
      signOptions: {
        expiresIn: 86400,
        subject: 'fakeId',
      },
    });

    configService = new ConfigService();
    envConfigService = new EnvConfigService(configService);
    sut = new AuthService(jwtService, envConfigService);
  });
});
