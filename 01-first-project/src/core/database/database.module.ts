import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';

@Module({
  imports: [
    EnvConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) => ({
        type: 'postgres',
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        database: configService.getDbName(),
        username: configService.getDbUser(),
        password: configService.getDbPassword(),
        options: {
          trustServerCertificate: true,
          encrypt: true,
        },
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
