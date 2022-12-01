import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { NewsletterService } from './newsletter/newsletter.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule,
  ],
  controllers: [AppController],
  providers: [DatabaseService, AppService, NewsletterService, UserService],
})
export class AppModule {}
