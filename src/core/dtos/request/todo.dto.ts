import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  user_id: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  @IsArray()
  files?: Express.Multer.File[];

}

class TodoId {
  @IsUUID()
  todo_id: string;

  @Type(() => Date)
  updatedAt: Date;
}

export class UpdateTodoDto extends IntersectionType(
  PartialType(CreateTodoDto),
  TodoId,
) {}
