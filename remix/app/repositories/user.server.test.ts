import type { User } from "@prisma/client";
import { prismaMock } from "../tests/setup-test-env";
import UserRespository from "../repositories/user.server"

describe("Test user model", () => {
    test("Create User", async () => {
        const user: User = {
            name: "Beckham",
            email: "phisith@nimblehq.co",
            avatarUrl: "weofkwepofkwefokwepfokwpo",
            createdAt: new Date(),
            id: 1
        };

        prismaMock.user.upsert.mockResolvedValue(user);

        await expect(UserRespository.updateOrCreate(user)).resolves.toEqual(
            user
        )
    });

    test("Update User if exits", async () => {
        const user: User = {
            name: "Nino",
            email: "phisith@nimblehq.co",
            avatarUrl: "weofkwepofkwefokwepfokwpo",
            createdAt: new Date(),
            id: 1
        };

        prismaMock.user.upsert.mockResolvedValue(user);

        await expect(UserRespository.updateOrCreate(user)).resolves.toEqual(
            user
        )
    });

    test("Find User by email", async () => {
        const user: User = {
            name: "Nino",
            email: "phisith@nimblehq.co",
            avatarUrl: "weofkwepofkwefokwepfokwpo",
            createdAt: new Date(),
            id: 1
        };
        const param = {
            email: "phisith@nimblehq.co",
        } as User;

        prismaMock.user.findUnique.mockResolvedValue(user)

        await expect(UserRespository.findBy(param)).resolves.toEqual(user)
    })

});
