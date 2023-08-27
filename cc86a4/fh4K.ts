import { Controller, Get, Req, Res } from '@nestjs/common';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() res): string {
    return res.sendFile(path.join(__dirname, 'image.jpg'))
  }
}
