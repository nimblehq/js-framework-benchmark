import type { User } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import type { UserProfile } from "~/types";
import { db } from "~/config/db.server";

import { SocialsProvider } from "remix-auth-socials";

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
    console.log(err);
  }

  return { user };
};

export default function Index() {
  const { user } = useLoaderData();

  return (
    <div>
      <h1>Newsletter Page</h1>
      <p>{user?.name}</p>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 403) {
    return (
      <div className="error-container">
        <p>You must be logged.</p>
        <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
          <button>Login with Google</button>
        </Form>
      </div>
    );
  }

  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
