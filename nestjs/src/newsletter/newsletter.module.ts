import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';

@Module({
  controllers: [NewsletterController],
  providers: [],
})
export class AppModule {}
