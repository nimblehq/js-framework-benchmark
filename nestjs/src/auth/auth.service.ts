import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { User as UserModel } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

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
        const user = await this.verifyOrCreateUser(userProfile.data);

        return user;
      },
    );
  }

  private async verifyOrCreateUser(userProfile): Promise<UserModel | Error> {
    try {
      const { picture, name, email } = userProfile;

      if (email === undefined) {
        return Promise.reject(new Error('No valid email was provided'));
      }

      const existingUser = await this.userService.find({ email: email });

      if (existingUser) {
        return Promise.resolve(existingUser);
      }

      const userAttributes = {
        avatarUrl: picture,
        name: name,
        email: email,
      };
      const newUser = await this.userService.create(userAttributes);

      return Promise.resolve(newUser);
    } catch (error) {
      return Promise.reject(new Error('User could not be verified or created'));
    }
  }
}
