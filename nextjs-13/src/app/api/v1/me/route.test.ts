/**
 * @jest-environment node
 */

import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import { dbClientMock } from '@test/database';
import { userFactory } from '@test/factories/user.factory';
import baseHandler from 'lib/handler/base.handler';

import { GET } from './route';
jest.mock('lib/handler/base.handler');

describe('GET /v1/me', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns a user', async () => {
    const userAttributes = { id: '1' };
    const user = { ...userFactory, ...userAttributes };

    baseHandler.mockImplementation((req, callback) => callback(user));
    dbClientMock.user.findUnique.mockResolvedValue(user);

    const res = await GET({});
    const body = await res.json();

    expect(res.status).toBe(StatusCodes.OK);
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
