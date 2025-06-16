import { Todo } from '../entities';
import { CreateTodoDto } from '../dtos';
import { UpdateTodoDto } from '../dtos';

export abstract class TodoRepository {
  abstract findOne(id: string): Promise<Todo | null>;
  abstract create(todo: CreateTodoDto): Promise<void>;
  abstract update(id: string, todo: UpdateTodoDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Todo[]>;
}
