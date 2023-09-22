import { Module } from '@nestjs/common';
import { CoursesController } from './infra/controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //imports: [AuthModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
