import { Injectable } from '@nestjs/common';
import { Hello } from './app.controller';

@Injectable()
export class AppService {
  getHello(): Hello {
    return { message: 'Hello World' };
  }
}
