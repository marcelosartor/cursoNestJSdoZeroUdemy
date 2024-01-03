import { PartialType } from '@nestjs/mapped-types'
import { CreateCourseDto } from './create-course.dto'
import { UpdateDto } from 'src/core/database/interfaces/update-dto.interface'

export class UpdateCourseDto extends PartialType(CreateCourseDto) implements UpdateDto {}
