import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { ImageRepository, TodoRepository } from '../../../core/repositories';
import { CreateTodoDto, TodoResponseDto, UpdateTodoDto } from 'src/core/dtos';
import { Todo } from '../../../core/entities';

@Injectable()
export class TodoCaseRepository implements TodoRepository {
  constructor(private readonly prismaService: PrismaService,
              private readonly imageCaseRepository : ImageRepository,) {}

  async findOne(id: string): Promise<Todo | null> {
    const todo = await this.prismaService.todo.findUnique({where : {todo_id : id}, select : TodoResponseDto})
    return todo
  }

  async create(todo: CreateTodoDto): Promise<void> {
     const todocreate = await this.prismaService.todo.create({data : {...todo}})
    if(todo.files){
      const image = await this.imageCaseRepository.uploadFile(todo.files)
      if(!image) throw new Error("Error uploading file")
      const payload_bucket = {
        image_url: image.fullPath,
        todo_id: todocreate.todo_id,
      }
      await this.imageCaseRepository.create(payload_bucket)
    }

  }

  async update(id: string, todo: UpdateTodoDto): Promise<void> {
     await this.prismaService.todo.update({where : {todo_id : id}, data : {...todo}})
  }

  async delete(id: string): Promise<void> {
     await this.prismaService.todo.delete({where : {todo_id : id}})
  }

  async findAll(): Promise<Todo[]> {
    return await this.prismaService.todo.findMany({ select : TodoResponseDto});
  }

}