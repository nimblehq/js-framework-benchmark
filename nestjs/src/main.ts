import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import oauthPlugin from '@fastify/oauth2';

import { AuthStrategyGoogle } from './auth/strategies/google.strategy';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const config = app.get<ConfigService>(ConfigService);
  const authStrategyGoogle = new AuthStrategyGoogle(config);

  await app.register(fastifyCookie, {
    secret: config.get('COOKIE_SECRET'),
  });
  app.register(oauthPlugin, authStrategyGoogle.get());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
