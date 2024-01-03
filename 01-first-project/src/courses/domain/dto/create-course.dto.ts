import { IsString, MaxLength, MinLength } from 'class-validator'
import { CreateDto } from 'src/core/database/interfaces/create-dto.interface'

export class CreateCourseDto implements CreateDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	readonly name: string
	@IsString()
	readonly description: string
	@IsString({ each: true })
	readonly tags: string[]
}
