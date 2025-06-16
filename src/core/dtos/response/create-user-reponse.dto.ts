import { User } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateUserResponseDto extends ResponseDto{
  user: User;
}

export class UpdateUserResponseDto extends CreateUserResponseDto {}
