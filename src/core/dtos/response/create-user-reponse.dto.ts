import { User } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateUserResponseDto extends ResponseDto{
  firstName: string
  lastName: string
  year: number | null
  email: string
  token: string | null
}

export class UpdateUserResponseDto extends CreateUserResponseDto {}
