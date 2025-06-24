import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../core/repositories';
import { CreateUserDto, UpdateUserDto, UserReponseDto } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';

@Injectable()
export class UserCaseRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { user_id: id },
      select: UserReponseDto,
    });
    if (!user) return null;
    return user;
  }

  async create(user: CreateUserDto): Promise<void> {
    await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.prismaService.user.update({
      where: { user_id: id },
      data: {
        ...user,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { user_id: id },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({select : UserReponseDto});
    return users
  }
}
