import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import { SUPABASE } from './consts';

export const SupabaseAuthProvider = {
  provide: SUPABASE,
  useFactory: () => {
    function createClient(context: any) {
      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PK) {
        throw new Error(
          'Missing process.env.SUPABASE_URL || process.env.SUPABASE_PK',
        );
      }

      return createServerClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PK,
        {
          cookies: {
            getAll() {
              return parseCookieHeader(context.req.headers.cookie ?? '');
            },
            setAll(cookiesToSet: any) {
              cookiesToSet.forEach(({ name, value, options }) =>
                context.res.appendHeader(
                  'Set-Cookie',
                  serializeCookieHeader(name, value, options),
                ),
              );
            },
          } as any,
        },
      );
    }
    return createClient;
  },
};
