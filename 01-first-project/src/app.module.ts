import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { EnvConfigModule } from './core/env-config/env-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoursesModule, EnvConfigModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
