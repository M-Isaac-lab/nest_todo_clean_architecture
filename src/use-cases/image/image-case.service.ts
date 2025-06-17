import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../core/repositories';
import { CreateImageDto } from 'src/core/dtos';
import { Image } from 'src/core/entities';

@Injectable()
export class ImageCaseService implements ImageRepository {
  constructor(private readonly imageCaseRepository: ImageRepository) {}

  async findOne(id: number): Promise<Image | null> {
    return await this.imageCaseRepository.findOne(id)
  }

  async create(image: CreateImageDto): Promise<Image | null> {
    return await this.imageCaseRepository.create(image)
  }

  async delete(id: number[]): Promise<void> {
    return await this.imageCaseRepository.delete(id)
  }

  async findAll(): Promise<Image[]> {
    return await this.imageCaseRepository.findAll()
  }

  async findByTodo(id: string): Promise<Image[]> {
    return await this.imageCaseRepository.findByTodo(id)
  }
}