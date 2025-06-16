
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserUseCasesModule } from '../../use-cases/user/user-use-cases.module';
import { JwtAuthStrategy } from './JwtAuthStrategy';

@Module({
  imports: [UserUseCasesModule, PassportModule],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
