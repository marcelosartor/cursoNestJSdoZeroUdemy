import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoursesModule } from './courses/courses.module'
import { EnvConfigModule } from './core/env-config/env-config.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './core/database/database.module'
import { TagModule } from './tag/tag.module';

@Module({
	imports: [CoursesModule, EnvConfigModule, AuthModule, DatabaseModule, TagModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
