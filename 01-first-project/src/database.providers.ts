import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { EnvConfigService } from './core/env-config/services/env-config.service';

config();

const configService = new EnvConfigService(new ConfigService());
console.log(__dirname + '/core/database/migrations/*.{.ts,.js}');

export default new DataSource({
  type: 'postgres',
  host: configService.getDbHost(),
  port: configService.getDbPort(),
  database: configService.getDbName(),
  username: configService.getDbUser(),
  password: configService.getDbPassword(),
  //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [`dist/*/.entity{.ts,.js}`],
  //migrations: [__dirname + '/core/database/migrations/*.{.ts,.js}'],
  migrations: ['dist/core/database/migrations/*{.ts,.js}'],
});

/*
import { DataSource } from 'typeorm';
import { EnvConfigModule } from './core/env-config/env-config.module';
import { EnvConfigService } from './core/env-config/services/env-config.service';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [EnvConfigModule],
    inject: [EnvConfigService],
    useFactory: async (configService: EnvConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        entities: [__dirname + '/../$$/$.entity{.ts,.js}'],
        database: configService.getDbName(),
        username: configService.getDbUser(),
        password: configService.getDbPassword(),
      });

      return dataSource.initialize();
    },
  },
];
*/
