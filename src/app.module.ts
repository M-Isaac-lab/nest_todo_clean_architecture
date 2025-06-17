import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { ConfigModule } from '@nestjs/config';
import { AuthCaseModule } from './use-cases/auth/auth-case.module';
import { ImageCaseModule } from './use-cases/image/image-case.module';
import { TodoCaseModule } from './use-cases/todo/todo-case.module';
import { AuthModule } from './frameworks/auth-services/auth.module';

@Module({
  imports: [UserUseCasesModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthCaseModule,
    ImageCaseModule,
    TodoCaseModule,
    AuthModule,

  ],
})
export class AppModule {}
