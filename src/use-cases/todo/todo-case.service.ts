import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../core/repositories';
import { CreateTodoDto, UpdateTodoDto } from 'src/core/dtos';
import { Todo } from 'src/core/entities';

@Injectable()
export class TodoCaseService implements TodoRepository {
  constructor(private readonly todoCaseRepository: TodoRepository) {}

  async findOne(id: string): Promise<Todo | null> {
    return await this.todoCaseRepository.findOne(id)
  }

  async create(todo: CreateTodoDto): Promise<void> {
    return await this.todoCaseRepository.create(todo)
  }

  async update(id: string, todo: UpdateTodoDto): Promise<void> {
    return await this.todoCaseRepository.update(id, todo)
  }

  async delete(id: string): Promise<void> {
    return await this.todoCaseRepository.delete(id)
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoCaseRepository.findAll()
  }
}