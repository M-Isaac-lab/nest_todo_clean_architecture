
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserUseCasesModule } from '../../use-cases/user/user-use-cases.module';
import { JwtStrategy } from './JwtAuthStrategy';
import { UserFactoryService } from '../../use-cases/user/user-factory.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../data-services/prisma/prisma.service';
import { UserRepository } from '../../core/repositories';

@Module({
  imports: [UserUseCasesModule, PassportModule],
  providers: [AuthService, JwtStrategy, JwtService, PrismaService,
    {
      provide: UserRepository,
      useClass: UserFactoryService,
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}
