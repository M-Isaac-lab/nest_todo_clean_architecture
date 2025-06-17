import { Module } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { UserController } from '../../controllers/user/user.controller';
import { UserCaseRepository } from './repositories/user-case-repository';
import { UserRepository } from '../../core/repositories';
import { PrismaService } from '../../frameworks/data-services/prisma/prisma.service';

@Module({
  providers: [UserFactoryService,
    PrismaService,
    {
      provide : UserRepository,
      useClass : UserCaseRepository,
    }
  ],
  controllers: [UserController],
})
export class UserUseCasesModule {
}
