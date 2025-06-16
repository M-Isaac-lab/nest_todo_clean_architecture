import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserFactoryService } from './use-cases/user/user-factory.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserUseCasesModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [UserController],
  providers: [UserFactoryService],
})
export class AppModule {}
