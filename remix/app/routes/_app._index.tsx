import { useLoaderData } from '@remix-run/react';

import AppLink from '../components/AppLink';
import NewsletterRepository from '../repositories/newsletter.server';

export async function loader() {
  const newsletters = await NewsletterRepository.findMany({});

  return { newsletters };
}

export default function Index() {
  const { newsletters } = useLoaderData<typeof loader>();

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
