import { Controller, Get, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  async authenticate(@Request() req, @Response() res) {
    try {
      await this.authService.signInWithGoogle(req);

      res.status(302).redirect('/success');
    } catch {
      return {
        error: 'uh oh!',
      };
    }
  }
}
