import { Controller, Get, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  async authenticate(
    @Request() request,
    @Response({ passthrough: true }) response,
  ) {
    try {
      const {
        server: { googleOAuth2 },
      } = request;

      const {
        token: { access_token: accessToken },
      } = await googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

      const currentUser = await this.authService.signInWithGoogle(accessToken);

      response
        .setCookie('_nest-newsletter', currentUser['id'], {
          path: '/',
          httpOnly: true,
          signed: true,
        })
        .status(302)
        .redirect('/');
    } catch (error) {
      response.status(302).redirect('/').send();
    }
  }
}
