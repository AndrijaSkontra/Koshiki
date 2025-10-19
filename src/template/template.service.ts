import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TemplateService implements OnModuleInit {
  public layout: string;
  public cardLayout: string;
  public sidebarLayout: string;
  public email: string;
  public dashboard: string;
  public credentials: string;
  public dockLayout: string;
  public notFound: string;

  constructor() {}
  onModuleInit() {
    this.layout = fs.readFileSync(
      path.join(process.cwd(), 'src/main/views/layout.hbs'),
      'utf8',
    );
    this.cardLayout = fs.readFileSync(
      path.join(process.cwd(), 'src/main/views/card-layout.hbs'),
      'utf8',
    );
    this.sidebarLayout = fs.readFileSync(
      path.join(process.cwd(), 'src/main/views/sidebar-layout.hbs'),
      'utf8',
    );
    this.dockLayout = fs.readFileSync(
      path.join(process.cwd(), 'src/main/views/dock-layout.hbs'),
      'utf8',
    );
    this.email = fs.readFileSync(
      path.join(process.cwd(), 'src/auth/views/email.hbs'),
      'utf8',
    );
    this.dashboard = fs.readFileSync(
      path.join(process.cwd(), 'src/dashboard/views/dashboard.hbs'),
      'utf8',
    );
    this.credentials = fs.readFileSync(
      path.join(process.cwd(), 'src/auth/views/credentials.hbs'),
      'utf8',
    );
    this.notFound = fs.readFileSync(
      path.join(process.cwd(), 'src/main/views/not-found.hbs'),
      'utf8',
    );
  }
}
