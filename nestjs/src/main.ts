import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import oauthPlugin from '@fastify/oauth2';
import fastifyServeSatic from '@fastify/static';

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

  app.register(fastifyServeSatic, {
    root: join(__dirname, '..', 'client'),
    prefix: '/app/',
    allowedPath: (pathName, _root, _request) => !pathName.includes('api')
  });

  app.register(fastifyServeSatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/assets/',
    allowedPath: (pathName, _root, _request) => pathName.includes('assets'),
    // The reply decorator has been added by the first plugin registration
    decorateReply: false 
  });

  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
