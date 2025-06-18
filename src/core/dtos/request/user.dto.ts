import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsUUID,
} from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  year?: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}

class UserId {
  @IsUUID()
  user_id: string;

  @Type(() => Date)
  updateAt: Date;
}

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  UserId,
) {}
