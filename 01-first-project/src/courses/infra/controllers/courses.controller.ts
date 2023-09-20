import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCourseDto } from 'src/courses/domain/dto/create-course.dto';
import { UpdateCourseDto } from 'src/courses/domain/dto/update-course.dto';
import { CoursesService } from 'src/courses/services/courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesServices: CoursesService) {}

  //@Get()
  //findAll(@Res() response) {
  //return response.status(HttpStatus.OK).send('Listagem de Cursos');
  //}

  // Sem Desestruturar
  /*
  @Get(':id/:name')
  findOneByIdAndName(@Param() params) {
    return `Curso n: ${params.id} nome: ${params.name}`;
  }
  

  @Get(':id/:name')
  findOneByIdAndName(@Param('id') _id: string, @Param('name') _name: string) {
    return `Curso n: ${_id} nome: ${_name}`;
  }
  */

  @Get()
  findAll() {
    return this.coursesServices.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') _id: string) {
    //return `Curso n: ${params.id} `;
    return this.coursesServices.findOne(_id);
  }

  @Post()
  //@HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() createCourseDto: CreateCourseDto) {
    //return body;
    return this.coursesServices.create(createCourseDto);
  }

  @Patch(':id')
  update(@Param('id') _id: string, @Body() _body: UpdateCourseDto) {
    //return `Atualização Curso n: ${_id} dados: ${_body}`;
    return this.coursesServices.update(_id, _body);
  }

  @Delete(':id')
  DeleteOneById(@Param('id') _id: string) {
    //return `Curso n: ${_id} deletado com sucesso `;
    return this.coursesServices.delete(_id);
  }
}
