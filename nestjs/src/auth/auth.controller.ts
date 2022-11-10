import { Controller, Get, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  async authenticate(@Request() request, @Response() response) {
    try {
      const {
        server: { googleOAuth2 },
      } = request;

      const {
        token: { access_token: accessToken },
      } = await googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

      await this.authService.signInWithGoogle(accessToken);

      response.status(302).redirect('/');
    } catch (error) {
      response.status(302).redirect('/auth/sign-in');
    }
  }
}
