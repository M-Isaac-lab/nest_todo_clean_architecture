import { User } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateUserResponseDto extends ResponseDto{
  User: User;
}

export class UpdateUserResponseDto extends CreateUserResponseDto {}
