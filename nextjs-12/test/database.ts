import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import dbClient from '../src/config/database';

jest.mock('../src/config/database', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const dbClientMock = dbClient as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(dbClientMock);
});
