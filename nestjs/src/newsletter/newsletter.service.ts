import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  @Get()
  getList() {
    return { newsletters: [] };
  }
}
