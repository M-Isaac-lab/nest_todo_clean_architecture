import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { Todo } from '../entities';

export abstract class TodoRepository {
  abstract findOne(id: string): Promise<Todo | null>;
  abstract create(todo: CreateTodoDto, files?: Express.Multer.File[],): Promise<void>;
  abstract update(id: string, todo: UpdateTodoDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Todo[]>;
}
