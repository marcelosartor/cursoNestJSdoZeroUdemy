import { Options } from '@nestjs/common'
import { Type } from 'class-transformer'
import { Tag } from 'src/tag/domain/entity/tag.entity'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'courses' })
export class Course {
	@PrimaryGeneratedColumn()
	id: number
	@Column()
	name: string
	@Column()
	description: string

	@JoinTable()
	@ManyToMany(() => Tag, tag => tag.courses, { cascade: true })
	tags: Tag[]
}
