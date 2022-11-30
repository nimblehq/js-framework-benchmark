import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { UserService } from './user.service';

@Module({
  providers: [DatabaseService, UserService],
  exports: [UserService],
})
export class UserModule {}
