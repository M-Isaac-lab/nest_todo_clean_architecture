import { Image } from '../entities';
import { CreateImageDto, UpdateImageDto } from '../dtos';

export abstract class ImageRepository {
  abstract findOne(id: string): Promise<Image | null>;
  abstract create(image: CreateImageDto): Promise<Image | null>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Image[]>;
}
