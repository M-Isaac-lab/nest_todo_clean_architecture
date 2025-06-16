import { Image } from '../entities';
import { CreateImageDto, UpdateImageDto } from '../dtos';

export abstract class ImageRepository {
  abstract findOne(id: string): Promise<Image | null>;
  abstract create(image: CreateImageDto): Promise<void>;
  abstract update(id: string, user: UpdateImageDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Image[]>;
}
