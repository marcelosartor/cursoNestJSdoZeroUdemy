import { Module } from '@nestjs/common'
import { CoursesController } from './infra/controllers/courses.controller'
import { CoursesService } from './services/courses.service'
import { AuthModule } from 'src/auth/auth.module'
import { Repository } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from './domain/entity/course.entity'
import { Tag } from 'src/tag/domain/entity/tag.entity'
import { TagService } from 'src/tag/services/tag.service'
import { TagModule } from 'src/tag/tag.module'

@Module({
	imports: [TypeOrmModule.forFeature([Course, Tag]), TagModule],
	controllers: [CoursesController],
	providers: [CoursesService],
})
export class CoursesModule {}
