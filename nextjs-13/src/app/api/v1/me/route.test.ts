/**
 * @jest-environment node
 */

import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';
import appHandler from 'lib/handler/app.handler';

import { GET } from './route';

jest.mock('lib/handler/app.handler');

describe('GET /v1/me', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns a user', async () => {
    const userAttributes = { id: '1' };
    const user = { ...userFactory, ...userAttributes };

    appHandler.mockImplementation((req, callback) => callback(user));
    dbClientMock.user.findUnique.mockResolvedValue(user);

    const response = await GET({});
    const body = await response.json();

    expect(response.status).toBe(StatusCodes.OK);
    expect(body.user).toMatchObject<User>({
      id: '1',
      name: expect.any(String),
      email: expect.any(String),
      avatarUrl: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
