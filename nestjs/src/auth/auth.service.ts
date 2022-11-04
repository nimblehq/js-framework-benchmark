import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async signInWithGoogle(request) {
    const {
      server: { googleOAuth2 },
    } = request;

    googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
      request,
      async (error, result) => {
        if (error) {
          throw new UnauthorizedException();
        }

        const requestOptions = {
          headers: {
            Authorization: 'Bearer ' + result.token.access_token,
          },
        };
        const userProfile = await this.httpService
          .get('https://www.googleapis.com/oauth2/v2/userinfo', requestOptions)
          .toPromise();

        console.log(userProfile);
      },
    );
  }
}
