import {
  Controller,
  Get,
  Request,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  async authenticate(@Request() req, @Response() res) {
    try {
      const {
        server: { googleOAuth2 },
      } = req;

      googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        req,
        async (error, result) => {
          if (error) {
            throw new UnauthorizedException();
          }
          const accessToken = result.token.access_token;

          await this.authService.signInWithGoogle(accessToken);

          res.status(302).redirect('/success');
        },
      );
    } catch (error) {
      res.status(302).redirect('/auth/sign-in');
    }
  }
}
