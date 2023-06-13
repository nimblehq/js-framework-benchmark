import { Newsletter } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import AppLink from '../components/AppLink';
import appHandler from '../lib/handler/app.handler';
import NewsletterRepository from '../repositories/newsletter.server';

export async function loader({ request }: LoaderArgs) {
  return appHandler(request, async (session) => {
    const newsletters = await NewsletterRepository.findMany({
      where: { userId: session.id },
    });

    return { newsletters };
  });
}

export default function Index() {
  const { newsletters } = useLoaderData<typeof loader>() as {
    newsletters: Newsletter[];
  };

  return (
    <>
      <section>
        <div className="flex justify-end">
          <AppLink href="/newsletter/create" name={'Create Newsletter'} />
        </div>
        <ul>
          {newsletters.map((newsletter) => (
            <li key={newsletter.id}>
              <h3>{newsletter.name}</h3>
              <span>{newsletter.content}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
