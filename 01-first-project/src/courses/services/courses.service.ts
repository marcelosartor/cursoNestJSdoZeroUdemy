import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Course } from '../domain/entity/course.entity'
import { CreateCourseDto } from '../domain/dto/create-course.dto'
import { UpdateCourseDto } from '../domain/dto/update-course.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Crud } from 'src/core/database/interfaces/crud.interface'
import { Tag } from 'src/tag/domain/entity/tag.entity'

@Injectable()
export class CoursesService implements Crud<Course> {
	// private courses: Course[] = [
	// 	{
	// 		id: 1,
	// 		name: 'Funcamentos do franework NestJS',
	// 		description: 'Funcamentos do franework NestJS',
	// 		tags: ['node.js', 'nestjs', 'javascript'],
	// 	},
	// ]
	constructor(
		@InjectRepository(Course)
		private readonly courseRepository: Repository<Course>,
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>,
	) {}

	findAll() {
		return this.courseRepository.find()
	}

	findOne(id: string) {
		const course = this.courseRepository.findOneBy({ id: +id })
		if (!course) {
			//throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
			throw new NotFoundException(`Course ID ${id} not found`)
		}
		return course
	}

	async create(createCourseDto: CreateCourseDto) {
		const tags = await Promise.all(createCourseDto.tags.map((name: string) => this.preloadTagByName(name)))
		const course = this.courseRepository.create({
			...createCourseDto,
			tags,
		})
		return this.courseRepository.save(course)
	}

	async update(id: string, updateCourseDto: UpdateCourseDto) {
		const tags = updateCourseDto.tags && (await Promise.all(updateCourseDto.tags.map((name) => this.preloadTagByName(name))))
		const course = await this.courseRepository.preload({
			id: +id,
			...updateCourseDto,
			tags,
		})
		if (!course) {
			throw new NotFoundException(`Course ID ${id} not found`)
		}
		return this.courseRepository.save(course)
	}

	async delete(id: string) {
		const course = await this.courseRepository.findOneBy({ id: +id })
		if (!course) {
			throw new NotFoundException(`Course ID ${id} not found`)
		}
		return this.courseRepository.remove(course)
	}

	private async preloadTagByName(name: string): Promise<Tag> {
		const tag = await this.tagRepository.findOneBy({ name })
		if (tag) {
			return tag
		}
		return this.tagRepository.create({ name })
	}
}
