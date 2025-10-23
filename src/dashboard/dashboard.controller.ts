import { Controller, Get, Header, Headers } from '@nestjs/common';
import { InjectHtml } from 'src/common/inject-html.decorator';
import { TemplateService } from 'src/template/template.service';
import { DeviceType } from 'src/common/types';
import { koshiki } from 'src/common/helper';
import { Device } from 'src/common/device-type.decorator';

@Controller('')
export class DashboardController {
  constructor(private readonly template: TemplateService) {}

  @Get()
  @InjectHtml()
  @Header('Content-Type', 'text/html')
  loginEmail(@Device() type: DeviceType) {
    return koshiki(
      this.template.dashboard,
      type === 'mobile' ? 'dock' : 'sidebar',
    );
  }
}
