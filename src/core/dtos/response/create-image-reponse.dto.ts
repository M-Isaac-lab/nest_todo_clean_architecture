import { Image } from '../../entities';
import { ResponseDto } from './response.dto';

export class CreateImageReponseDto extends ResponseDto{
  image: Image;
}

export class UpdateImageReponseDto extends CreateImageReponseDto {}
