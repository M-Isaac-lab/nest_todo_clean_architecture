import { Image } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateImageReponseDto extends ResponseDto{
  image_url: string;
  createAt: Date;
  todo_id: string;
}

export class UpdateImageResponseDto extends CreateImageReponseDto {}
