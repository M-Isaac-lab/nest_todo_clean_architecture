import { Global, Module } from '@nestjs/common';
import { ImageCaseService } from './image-case.service';

@Global()
@Module({
  providers: [ImageCaseModule],
  exports: [ImageCaseService],
})
export class ImageCaseModule {}