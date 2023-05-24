import type { User } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/config/auth.server";
import type { UserProfile } from "~/types";
import { db } from "~/config/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userRequest = (await authenticator.isAuthenticated(request)) as any;
  const userProfile: UserProfile = userRequest?._json;

  if (!userProfile) {
    throw new Response("Forbidden", { status: 403 });
  }

  let user: User | null = null;

  try {
    user = await db.user.findUnique({
      where: { email: userProfile.email },
    });
  } catch (err) {
    throw err;
  }

  return { user };
};

export default function Index() {
  const { user } = useLoaderData();

  return (
    <div>
      <h1>Newsletter Page</h1>
      <p>{user?.name}</p>
      <Outlet />
    </div>
  );
}
