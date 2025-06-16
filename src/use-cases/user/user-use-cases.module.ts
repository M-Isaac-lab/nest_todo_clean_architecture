import { Module } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';

@Module({
  providers: [UserUseCasesModule],
  exports: [UserFactoryService],
})
export class UserUseCasesModule {
}
