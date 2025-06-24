import { Todo } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateTodoResponseDto extends ResponseDto {
  Todo: Todo;
}

export class UpdateTodoResponseDto extends CreateTodoResponseDto {}
