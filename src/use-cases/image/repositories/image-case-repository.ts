import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../../core/repositories';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { CreateImageDto } from 'src/core/dtos';
import { Image } from 'src/core/entities';
import { supabase, supabasebucket } from '../../../frameworks/supabase/supabase.const';


@Injectable()
export class ImageCaseRepository implements ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadFile(file) {
    const { data, error } = await supabase.storage.from(supabasebucket).upload('file_path', file)
    if (error) {
      throw new Error(error.message)
      // Handle error
    } else {
      return data
      // Handle success
    }
  }

  async findOne(id: string): Promise<Image | null> {
    throw new Error('Method not implemented.');
  }

  async create(image: CreateImageDto): Promise<Image | null> {
    const image_url = await this.uploadFile(image.file)
    return await this.prismaService.image.create({data : {...image, image_url : image_url?.fullPath}})

  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Image[]> {
    throw new Error('Method not implemented.');
  }

}