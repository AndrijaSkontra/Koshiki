import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HtmlInterceptor } from './common/html.interceptor';
import { TemplateModule } from './template/template.module';
import { TemplateService } from './template/template.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SupabaseAuthProvider } from './auth/supabase-provider';
import { MyExceptionFilter } from './common/exception.filter';
import { DebugController } from './browser-debug/browser-debug.controller';

@Module({
  imports: [AuthModule, TemplateModule, DashboardModule],
  controllers: [DebugController],
  providers: [
    SupabaseAuthProvider,
    TemplateService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HtmlInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule {}
