import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { User as UserModel } from '@prisma/client';
import { AuthGoogleClient as GoogleClient } from './client/google.client';
import { AuthError } from './auth.error';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  async signInWithGoogle(accessToken: string) {
    try {
      const googleClient = new GoogleClient(accessToken, this.httpService);
      const userProfile = await lastValueFrom(await googleClient.getUserInfo());

      const user = await this.verifyOrCreateUser(userProfile.data);

      return user;
    } catch (error) {
      throw new AuthError('Authentication with Google failed');
    }
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
