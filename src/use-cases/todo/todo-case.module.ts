import { Module } from '@nestjs/common';
import { TodoCaseService } from './todo-case.service';
import { TodoController } from '../../controllers/todo/todo.controller';
import { ImageRepository, TodoRepository } from '../../core/repositories';
import { TodoCaseRepository } from './repositories/todo-case-repository';
import { PrismaService } from '../../frameworks/data-services/prisma/prisma.service';
import { ImageCaseModule } from '../image/image-case.module';
import { ImageCaseRepository } from '../image/repositories/image-case-repository';

@Module({
  providers: [TodoCaseService,
    PrismaService,
    {
      provide: TodoRepository,
      useClass: TodoCaseRepository,
    },
    {
      provide: ImageRepository,
      useClass: ImageCaseRepository,
    }
  ],
  controllers: [TodoController],
  exports: [TodoCaseService]
})

export class TodoCaseModule {}