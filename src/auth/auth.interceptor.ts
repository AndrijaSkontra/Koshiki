import {
  Injectable,
  ExecutionContext,
  Inject,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { SUPABASE } from './consts';
import { SupabaseClient } from '@supabase/supabase-js';
import { Reflector } from '@nestjs/core';
import { Public } from './public.decorator';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject(SUPABASE) private readonly getSupabase: ({ }) => SupabaseClient,
    private reflector: Reflector,
  ) { }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const isPublic = this.reflector.get(Public, context.getHandler());

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const supabase = this.getSupabase({ req, res });
    const { data, error } = await supabase.auth.getSession();

    if (isPublic && data?.session) {
      res.redirect('/');
      return of(undefined);
    } else if (isPublic) {
      return next.handle();
    }

    if (error || !data?.session) {
      res.redirect('/login');
      return of(undefined);
    }

    return next.handle();
  }
}
