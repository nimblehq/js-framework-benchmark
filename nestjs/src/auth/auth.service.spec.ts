import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import { axiosResponseFactory } from '../../test/factories/axios.factory';
import { userFactory } from '../../test/factories/user.factory';

import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  let httpService: HttpService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AuthService, DatabaseService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    userService = module.get<UserService>(UserService);
  });

  describe('signInWithGoogle', () => {
    describe('given a valid access token', () => {
      describe('given there is an existing user', () => {
        it('returns the existing user', async () => {
          const userAttributes = {
            email: 'dev@nimblehq.co',
          };
          const existingUser = { ...userFactory, ...userAttributes };
          const userProfile = { ...userAttributes, name: 'Nimble', photo: '' };
          const googleClientResponse = {
            ...axiosResponseFactory,
            data: userProfile,
          };

          jest
            .spyOn(httpService, 'get')
            .mockImplementation(() => of(googleClientResponse));
          jest.spyOn(userService, 'find').mockResolvedValue(existingUser);

          await expect(
            service.signInWithGoogle('VALID_TOKEN'),
          ).resolves.toEqual(existingUser);
        });
      });

      describe('given there is NO existing user', () => {
        it('creates and returns a new user', async () => {
          const userProfile = {
            email: 'dev@nimblehq.co',
            name: 'Nimble',
            photo: '',
          };
          const googleClientResponse = {
            ...axiosResponseFactory,
            data: userProfile,
          };
          const newUser = { ...userFactory, email: 'dev@nimblehq.co' };

          jest
            .spyOn(httpService, 'get')
            .mockImplementation(() => of(googleClientResponse));
          jest.spyOn(userService, 'find').mockResolvedValue(null);
          jest.spyOn(userService, 'create').mockResolvedValue(newUser);

          await expect(
            service.signInWithGoogle('VALID_TOKEN'),
          ).resolves.toEqual(newUser);
        });
      });

      describe('given the Google profile contains NO email', () => {
        it('returns an error', async () => {
          const userProfile = { email: undefined, name: 'Nimble', photo: '' };
          const googleClientResponse = {
            ...axiosResponseFactory,
            data: userProfile,
          };

          jest
            .spyOn(httpService, 'get')
            .mockImplementation(() => of(googleClientResponse));

          await expect(
            service.signInWithGoogle('VALID_TOKEN'),
          ).rejects.toThrow();
        });
      });
    });

    describe('given an invalid access token', () => {
      it('throws an error', async () => {
        await expect(
          service.signInWithGoogle('INVALID_TOKEN'),
        ).rejects.toThrow();
      });
    });
  });
});
