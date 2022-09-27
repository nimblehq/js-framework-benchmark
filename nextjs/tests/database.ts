import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import dbClient from '../config/database';

jest.mock('../config/database', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(dbClientMock)
});

export const dbClientMock = dbClient as unknown as DeepMockProxy<PrismaClient>;
