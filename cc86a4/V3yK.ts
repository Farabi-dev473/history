import { Controller, Get, Req, Res } from '@nestjs/common';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res): string {
    return res.sendFile('/home/farabi-dev/Codes/CEA/tasks/january/price-runner-backend/images/image.jpg')
  }
}
