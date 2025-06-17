import { Global, Module } from '@nestjs/common';
import { ImageCaseService } from './image-case.service';
import { ImageCaseRepository } from './repositories/image-case-repository';
import { PrismaService } from '../../frameworks/data-services/prisma/prisma.service';
import { ImageRepository } from '../../core/repositories';

@Global()
@Module({
  providers: [ImageCaseService,
    PrismaService,
    {
    provide: ImageRepository,
    useClass: ImageCaseRepository,
  }
  ],
  exports: [ImageCaseService],
})
export class ImageCaseModule {}