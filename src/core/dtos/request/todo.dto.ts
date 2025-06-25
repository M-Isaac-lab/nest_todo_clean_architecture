import { IsString, IsUUID } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  user_id: string;

}

class TodoId {
  @IsUUID()
  todo_id: string;
}

export class UpdateTodoDto extends IntersectionType(
  PartialType(CreateTodoDto),
  TodoId,
) {}
