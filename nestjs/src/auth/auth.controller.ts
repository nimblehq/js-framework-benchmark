import { Controller, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  authenticate(@Request() req) {
    return this.authService.signInWithGoogle(req);
  }
}
