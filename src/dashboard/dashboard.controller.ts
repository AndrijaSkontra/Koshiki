import { Controller, Get, Header, Headers } from '@nestjs/common';
import { InjectHtml } from 'src/common/inject-html.decorator';
import { TemplateService } from 'src/template/template.service';
import Handlebars from 'handlebars';
import { LayoutType } from 'src/common/types';
import { koshiki, getLayoutType } from 'src/common/helper';

@Controller('')
export class DashboardController {
  constructor(private readonly template: TemplateService) {}

  @Get()
  @InjectHtml()
  @Header('Content-Type', 'text/html')
  loginEmail(@Headers() headers: Headers) {
    const userAgentHeader = headers['user-agent'];
    if (!userAgentHeader) {
      throw new Error('Missing user agent header');
    }
    return koshiki(this.template.dashboard, getLayoutType(userAgentHeader));
  }
}
