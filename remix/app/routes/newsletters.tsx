import type { User } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/config/auth.server";
import type { UserProfile } from "~/types";
import { db } from "~/config/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = (await authenticator.isAuthenticated(request)) as {
    _json: UserProfile;
  };

  let user: User | null = null;

  if (!profile?._json) {
    throw new Response("Forbidden", { status: 403 });
  }

  try {
    user = await db.user.findUnique({
      where: { email: profile?._json.email },
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
