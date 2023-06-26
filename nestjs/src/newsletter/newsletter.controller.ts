import { Controller } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller()
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}
}
