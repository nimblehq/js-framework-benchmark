import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DatabaseService, AppService],
})
export class AppModule {}
