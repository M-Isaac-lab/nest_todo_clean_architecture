import { ResponseDto } from './response.dto';
import { CreateImageReponseDto } from './create-image-reponse.dto';

export class CreateTodoResponseDto extends ResponseDto {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  Images : CreateImageReponseDto[];
}

export class UpdateTodoResponseDto extends CreateTodoResponseDto {}
