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

  async create(todo: CreateTodoDto, files : Express.Multer.File[]): Promise<void> {
     const todocreate = await this.prismaService.todo.create({data : {...todo}})
    if(files.length > 0){
      const files_array = await this.imageCaseRepository.uploadFiles(files, todocreate.user_id, todocreate.todo_id)
      if(!files_array) throw new Error("Error uploading file")
      for(const file of files_array) {
        const payload_bucket = {
          image_url: file.fullPath,
          todo_id: todocreate.todo_id,
        }
        await this.imageCaseRepository.create(payload_bucket)
      }

    }

  }

  async update(id: string, todo: UpdateTodoDto): Promise<void> {
     await this.prismaService.todo.update({where : {todo_id : id}, data : {...todo, updatedAt : new Date()}})
  }

  async delete(id: string): Promise<void> {
     await this.prismaService.todo.delete({where : {todo_id : id}})
  }

  async findAll(): Promise<Todo[]> {
    return await this.prismaService.todo.findMany({ select : TodoResponseDto});
  }

}