import { Form } from "@remix-run/react";
import { SocialsProvider } from "remix-auth-socials";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>JS Framework Benchmark</p>
      <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
        <button>Login with Google</button>
      </Form>
    </div>
  );
}
