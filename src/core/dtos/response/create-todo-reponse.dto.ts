import { Todo } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateTodoResponseDto extends ResponseDto {
  todo: Todo;
}

export class UpdateTodoResponseDto extends CreateTodoResponseDto {}
