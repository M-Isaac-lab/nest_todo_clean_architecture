import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../../core/repositories';
import { PrismaService } from '../../../frameworks/data-services/prisma/prisma.service';
import { CreateImageDto, ImageReponseDto } from 'src/core/dtos';
import { BucketEntity, Image } from 'src/core/entities';
import { supabase, supabasebucket } from '../../../frameworks/supabase/supabase.const';
import { sanitizeFileName } from '../../../core/utils/sanitizeFileName';


@Injectable()
export class ImageCaseRepository implements ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByTodo(id: string): Promise<Image[]> {
    return await this.prismaService.image.findMany({
      where: { todo_id: id },
      select : ImageReponseDto
    });
  }

  async uploadFiles(files: Express.Multer.File[],  user_id : string, todo_id : string): Promise<BucketEntity[] | null> {
    const results: BucketEntity[] = [];

    for (const file of files) {
      if (file?.buffer && file?.originalname && file?.mimetype) {
        const safeName = sanitizeFileName(file.originalname);
        const { data, error } = await supabase.storage
          .from(supabasebucket)
          .upload(`uploads/${user_id}/${todo_id}/${safeName}`, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });

        if (error) throw new Error("error her "+error.message);
        if (data) results.push(data);
      } else {
        throw new Error("❌ Un fichier est invalide ou mal formaté.");
      }
    }

    return results;
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
    return await this.prismaService.image.findUnique({where : {image_id : id}, select : ImageReponseDto})
  }

  async create(image: CreateImageDto): Promise<Image | null> {
    return await this.prismaService.image.create({
      data: { ...image },
      select : ImageReponseDto
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
    return await this.prismaService.image.findMany({select : ImageReponseDto});
  }
}