import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService],
  exports: [AuthService],
})
export class AuthModule {}
