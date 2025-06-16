import { Injectable } from '@nestjs/common';
import { AuthCaseRepository } from './repositories/auth-case-repository';
import { AuthRepository } from '../../core/repositories/auth-repository';
import { CreateUserDto } from 'src/core/dtos';
import { User } from 'src/core/entities';

@Injectable()
export class AuthCaseService implements AuthRepository {
  constructor(private readonly authCaseRepository: AuthCaseRepository) {}

  async login(email: string, password: string): Promise<User | null> {
    return await this.authCaseRepository.login(email, password);
  }
  async register(user: CreateUserDto): Promise<void> {
    return await this.authCaseRepository.register(user);
  }
  async verifyauth(otp: string, id: string): Promise<User | null> {
    return await this.authCaseRepository.verifyauth(otp, id);
  }
}
