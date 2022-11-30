import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDashboard(): string {
    return 'Nest Newsletter!';
  }
}
