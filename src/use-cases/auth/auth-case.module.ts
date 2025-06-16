import { Module } from '@nestjs/common';
import { AuthCaseService } from './auth-case.service';

@Module({
  providers: [AuthCaseModule],
  exports: [AuthCaseService],
})
export class AuthCaseModule {
}
