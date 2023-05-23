import type { LoaderArgs } from "@remix-run/node";

import { SocialsProvider } from "remix-auth-socials";
import { authenticator } from "~/services/auth.server";

export const loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/newsletters",
    failureRedirect: "/",
  });
};
