import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TemplateService } from 'src/template/template.service';
import { SupabaseAuthProvider } from './supabase-provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TemplateService, SupabaseAuthProvider],
})
export class AuthModule {}
