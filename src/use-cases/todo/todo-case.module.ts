import { Module } from '@nestjs/common';
import { TodoCaseService } from './todo-case.service';

@Module({
  providers: [TodoCaseModule],
  exports: [TodoCaseService],
})

export class TodoCaseModule {}