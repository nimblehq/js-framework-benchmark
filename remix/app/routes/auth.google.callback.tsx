import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

import { SocialsProvider } from "remix-auth-socials";

export const loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/newsletters",
    failureRedirect: "/",
  });
};
