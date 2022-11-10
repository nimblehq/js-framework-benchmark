import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: NestFastifyApplication;
  const authService = { signInWithGoogle: () => Promise.resolve(true) };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /auth/google', () => {
    describe('given a successful user authentication', () => {
      it('redirects to the success page', async () => {
        return app
          .inject({
            method: 'GET',
            url: '/auth/google',
          })
          .then((result) => {
            expect(result.statusCode).toEqual(302);
            expect(result.headers.location).toEqual('/');
          });
      });
    });

    describe('given a failed user authentication', () => {
      it('redirects to the sign-in page', async () => {
        return app
          .inject({
            method: 'GET',
            url: '/auth/google',
          })
          .then((result) => {
            expect(result.statusCode).toEqual(302);
            expect(result.headers.location).toEqual('/auth/sign-in');
          });
      });
    });
  });
});
