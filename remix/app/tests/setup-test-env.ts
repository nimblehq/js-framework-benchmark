import type { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom/extend-expect";
import type { DeepMockProxy } from 'jest-mock-extended';
import { mockDeep, mockReset } from 'jest-mock-extended'
import db from "../config/db.server";

jest.mock("../config/db.server", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>