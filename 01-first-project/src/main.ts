import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfigService } from './core/env-config/services/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Só permite entrar os dados definitos no validation type
      forbidNonWhitelisted: true, // Se não passar pela validação de estrutura validation type bloqueia
      transform: true, // transforma do Json em um Objeto DTO
    }),
  );
  const configService = app.get(EnvConfigService);

  await app.listen(configService.getAppPort() || 3000);

  console.log(
    `Application is running on: ${configService.getAppPort() || 3000}`,
  );
}
bootstrap();
