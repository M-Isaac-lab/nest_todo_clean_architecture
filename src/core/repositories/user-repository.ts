import { CreateUserDto, UpdateUserDto } from '../dtos';
import { User } from '../entities';

export abstract class UserRepository {
  abstract findOne(id: string): Promise<User | null>;
  abstract create(user: CreateUserDto): Promise<void>;
  abstract update(id: string, user: UpdateUserDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<User[]>;
}
