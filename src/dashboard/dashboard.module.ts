import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { TemplateService } from 'src/template/template.service';

@Module({
  controllers: [DashboardController],
  providers: [TemplateService],
})
export class DashboardModule {}
