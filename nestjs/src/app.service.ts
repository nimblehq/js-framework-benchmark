import { HttpCode, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @HttpCode(200)
  getHealth() {}
}
