import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Global()
@Module({
  providers : [
    MailerModule,
  ],
  exports: [MailerService]
})
export class MailerModule {}