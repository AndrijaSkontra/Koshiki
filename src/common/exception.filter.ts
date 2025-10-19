import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
} from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';

@Injectable()
// @Catch()
export class MyExceptionFilter implements ExceptionFilter {
  constructor(private readonly template: TemplateService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(404);
    response.setHeader('Content-Type', 'text/html');
    response.send(this.template.notFound);
  }
}
