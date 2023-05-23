import type { ActionArgs } from "@remix-run/node";
import { SocialsProvider } from "remix-auth-socials";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionArgs) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/newsletters",
    failureRedirect: "/",
  });
};
