import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class DebugController {
  @Get('.well-known/appspecific/com.chrome.devtools.json')
  @Header('Content-Type', 'application/json')
  @Header('Cache-Control', 'public, max-age=3600')
  getDevToolsConfig(@Res() res: Response) {
    return res.json({
      version: '1.0.0',
      enabled: false,
    });
  }
}
