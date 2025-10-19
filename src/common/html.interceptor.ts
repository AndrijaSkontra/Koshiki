import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { INJECT_HTML_KEY } from './inject-html.decorator';
import Handlebars from 'handlebars';
import { TemplateService } from '../template/template.service';
import { LayoutType } from './types';

@Injectable()
export class HtmlInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly templateService: TemplateService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const injectHtmlOptions = this.reflector.getAllAndOverride(
      INJECT_HTML_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!injectHtmlOptions) {
      return next.handle();
    }

    return next.handle().pipe(
      map(({ type, data }: { type: LayoutType; data: string }) => {
        try {
          Handlebars.registerHelper(
            'getInsidePartial',
            function (_context, _options) {
              return data;
            },
          );

          if (type === 'sidebar') {
            const sidebarLayout = Handlebars.compile(
              this.templateService.sidebarLayout,
            )({});
            Handlebars.registerPartial('sidebar', sidebarLayout);

            Handlebars.registerHelper(
              'getPartial',
              function (_context, _options) {
                return 'sidebar';
              },
            );
          } else if (type === 'card') {
            const cardLayout = Handlebars.compile(
              this.templateService.cardLayout,
            )({});
            Handlebars.registerPartial('card', cardLayout);

            Handlebars.registerHelper(
              'getPartial',
              function (_context, _options) {
                return 'card';
              },
            );
          } else if (type === 'dock') {
            const dockLayout = Handlebars.compile(
              this.templateService.dockLayout,
            )({});
            Handlebars.registerPartial('dock', dockLayout);

            Handlebars.registerHelper(
              'getPartial',
              function (_context, _options) {
                return 'dock';
              },
            );
          }
          const layoutHbs = Handlebars.compile(this.templateService.layout);
          return layoutHbs({});
        } catch (e) {
          return `<h1>${e}</h1>`;
        }
      }),
    );
  }
}
