import { Module } from '@nestjs/common';
import { AuthCaseService } from './auth-case.service';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthRepository } from '../../core/repositories/auth-repository';
import { AuthCaseRyepository } from './repositories/auth-case-repository';
import { PrismaService } from '../../frameworks/data-services/prisma/prisma.service';
import { MailerService } from '../../frameworks/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthCaseService,
    PrismaService,
    MailerService,
    JwtService,
    {
      provide: AuthRepository,
      useClass: AuthCaseRyepository
    }
  ],
  controllers : [AuthController],
  exports: [AuthCaseService],
})
export class AuthCaseModule {
}
