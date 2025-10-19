import {
  Controller,
  Get,
  Header,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { koshiki } from 'src/common/helper';
import { InjectHtml } from 'src/common/inject-html.decorator';
import { TemplateService } from 'src/template/template.service';
import { SUPABASE } from './consts';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { Public } from './public.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly template: TemplateService,
    @Inject(SUPABASE) private readonly getSupabase: ({}) => SupabaseClient,
  ) {}

  @Get('login')
  @InjectHtml()
  @Header('Content-Type', 'text/html')
  @Public()
  async loginEmail() {
    return koshiki(this.template.email, 'card');
  }

  @Post('logout')
  async logoutSupabase(@Req() req: Request, @Res() res: Response) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const supabase = this.getSupabase({ req, res });
    const { error } = await supabase.auth.signOut();

    console.log('error');
    console.log(error);
    // Use HX-Redirect header for htmx client-side redirect
    res.setHeader('HX-Location', '/login');
    res.status(200).send();
  }

  @Post('login')
  @Public()
  async loginSupabase(@Req() req: Request, @Res() res: Response) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('body req: ');
    console.log(req.body);
    const supabase = this.getSupabase({ req, res });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      res
        .status(200)
        .send('<p class="text-error text-sm mt-2">Invalid password</p>');
      return;
    }

    // Use HX-Redirect header for htmx client-side redirect
    res.setHeader('HX-Location', '/');
    res.status(200).send();
  }

  @Get('credentials')
  @InjectHtml()
  @Header('Content-Type', 'text/html')
  @Public()
  loginCredentials() {
    return koshiki(this.template.credentials, 'card');
  }
}
