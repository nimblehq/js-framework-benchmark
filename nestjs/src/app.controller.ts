import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { NewsletterService } from './newsletter/newsletter.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly newsletterService: NewsletterService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @Render('newsletter/index')
  getDasboard() {
    return this.newsletterService.getList();
  }

  @Get('/_health')
  getHealth() {
    return this.appService.getHealth();
  }
}
