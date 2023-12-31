import { Global, Inject, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './infra/controllers/auth.controller';
import { PostTokenAuthService } from './services/post-token-auth.service';
import { PostTokenAuthController } from './infra/controllers/post-token-auth.controller';
import { PostCheckTokenAuthController } from './infra/controllers/post-check-token-auth.controller';
import { PostCheckTokenAuthService } from './services/post-check-token-auth.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: EnvConfigService) => ({
        global: true,
        secret: configService.getJwtSecret(),
        singOptions: { expiresIn: configService.getJwtExpiresInSeconds() },
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [AuthService, PostTokenAuthService, PostCheckTokenAuthService],
  controllers: [
    AuthController,
    PostTokenAuthController,
    PostCheckTokenAuthController,
  ],
  exports: [PostCheckTokenAuthService],
})
export class AuthModule {}
