import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { TodoRepository } from '../../../core/repositories';
import { CreateTodoDto, UpdateTodoDto } from 'src/core/dtos';
import { Todo } from 'src/core/entities';

@Injectable()
export class TodoCaseRepository implements TodoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({where : {todo_id : id}})

  }

  async create(todo: CreateTodoDto): Promise<void> {
     await this.prismaService.todo.create({data : {...todo}})
  }

  async update(id: string, todo: UpdateTodoDto): Promise<void> {
     await this.prismaService.todo.update({where : {todo_id : id}, data : {...todo}})
  }

  async delete(id: string): Promise<void> {
     await this.prismaService.todo.delete({where : {todo_id : id}})
  }

  async findAll(): Promise<Todo[]> {
    return await this.prismaService.todo.findMany();
  }
}