import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { UserRepository } from '../../core/repositories';

@Injectable()
export class UserFactoryService implements UserRepository {
  constructor(private readonly userCaseRepository: UserRepository) {}

  async create(user: CreateUserDto): Promise<void> {
    return this.userCaseRepository.create(user);
  }
  async update(id: string, user: UpdateUserDto): Promise<void> {
    return this.userCaseRepository.update(id, user);
  }
  async delete(id: string): Promise<void> {
    return this.userCaseRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userCaseRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    return await this.userCaseRepository.findOne(id);
  }
}
