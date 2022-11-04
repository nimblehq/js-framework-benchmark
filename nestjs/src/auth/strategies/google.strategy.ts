import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Credentials, FastifyOAuth2Options } from '@fastify/oauth2';
import oauthPlugin from '@fastify/oauth2';

@Injectable()
export class AuthStrategyGoogle implements FastifyOAuth2Options {
  name: string;
  scope: string[];
  credentials: Credentials;
  callbackUri: string;
  startRedirectPath: string;

  constructor(private readonly configService: ConfigService) {}

  get() {
    return {
      name: 'googleOAuth2',
      scope: ['profile'],
      credentials: {
        client: {
          id: this.configService.get('OAUTH_GOOGLE_CLIENT_ID'),
          secret: this.configService.get('OAUTH_GOOGLE_CLIENT_SECRET'),
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      startRedirectPath: '/auth/sign-in',
      callbackUri: `${this.configService.get('HOST_URL')}/auth/google`,
    };
  }
}
