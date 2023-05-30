import type { PrismaClient } from '@prisma/client';
import '@testing-library/jest-dom/extend-expect';
import type { DeepMockProxy } from 'jest-mock-extended';
import { mockDeep, mockReset } from 'jest-mock-extended';

import dbClient from '../config/database.server';

jest.mock('../config/database.server', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = dbClient as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
