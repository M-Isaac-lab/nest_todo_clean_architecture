import { BucketEntity, Image } from '../entities';
import { CreateImageDto } from '../dtos';

export abstract class ImageRepository {
  abstract findOne(id: number): Promise<Image | null>;
  abstract create(image: CreateImageDto): Promise<Image | null>;
  abstract delete(id: number[]): Promise<void>;
  abstract findAll(): Promise<Image[]>;
  abstract findByTodo(id: string): Promise<Image[]>;
  abstract uploadFile(file : Express.Multer.File[]): Promise< BucketEntity | null>;
}
