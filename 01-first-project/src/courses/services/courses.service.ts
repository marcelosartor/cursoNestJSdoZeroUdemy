import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from '../domain/entity/course.entity';
import { CreateCourseDto } from '../domain/dto/create-course.dto';
import { UpdateCourseDto } from '../domain/dto/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Funcamentos do franework NestJS',
      description: 'Funcamentos do franework NestJS',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find(
      (course: Course) => course.id === Number(id),
    );
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    const createCourse = { id: this.courses.length + 1, ...createCourseDto };
    this.courses.push(createCourse);
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );
    this.courses[indexCourse] = updateCourseDto;
  }

  delete(id: string) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );
    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
