import { Injectable } from '@nestjs/common';
import { UserCaseRepository } from './repositories/user-case-repository';

@Injectable()
export class UserFactoryService {
  constructor(
    private readonly userCaseRepository: UserCaseRepository,
  ) {}

  async findOne(id: string): Promise<any> {
    const user = await this.userCaseRepository.findOne(id);
    return user;
  }
}
