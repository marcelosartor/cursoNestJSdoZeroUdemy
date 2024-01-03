import { Global, Module } from '@nestjs/common';
import { EnvConfigService } from './services/env-config.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: EnvConfigService.loadConfigEnv(),
      //load: [ConfigurationFactory],
      validationOptions: {
        allowUnknown: false,
      },
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
/*
@Module({
  imports: [ConfigModule],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    console.log('__dirname:', __dirname);
    return super.forRoot({
      ...options,
      envFilePath: './.env',
    });
  }
}
*/
