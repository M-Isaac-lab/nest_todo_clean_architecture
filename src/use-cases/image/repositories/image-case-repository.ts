import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../../core/repositories';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { CreateImageDto } from 'src/core/dtos';
import { BucketEntity, Image } from 'src/core/entities';
import { supabase, supabasebucket } from '../../../frameworks/supabase/supabase.const';


@Injectable()
export class ImageCaseRepository implements ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByTodo(id: string): Promise<Image[]> {
    return await this.prismaService.image.findMany({
      where: { todo_id: id },
    });
  }

  async uploadFile(file) : Promise<BucketEntity | null> {
    const { data, error } = await supabase.storage
      .from(supabasebucket)
      .upload('file_path', file);
    if (error) {
      throw new Error(error.message);
      // Handle error
    } else {
      return data;
      // Handle success
    }
  }

  async downloadFile(path: string) {
    // Use the JS library to download a file.
    const { data, error } = await supabase.storage.from(supabasebucket).download(path)
    if (error) {
      throw new Error(error.message)
    } else {
      return data
    }
  }

  async deleteFile(path: string) {
    await supabase.storage.from(supabasebucket).remove([path]);
  }

  async findOne(id: number): Promise<Image | null> {
    return await this.prismaService.image.findUnique({where : {image_id : id}})
  }

  async create(image: CreateImageDto): Promise<Image | null> {
    return await this.prismaService.image.create({
      data: { ...image },
    });
  }

  async delete(ids: number[]): Promise<void> {
    for (const id of ids) {
      const image = await this.prismaService.image.findUnique({
        where: { image_id: id },
      });
      if (!image) throw new Error('Image not found');
      await this.deleteFile(image.image_url);
    }
  }

  async findAll(): Promise<Image[]> {
    return await this.prismaService.image.findMany();
  }
}