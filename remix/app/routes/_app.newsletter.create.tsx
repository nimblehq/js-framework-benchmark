import { ActionArgs, json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import appHandler from '../lib/handler/app.handler';
import NewsletterRepository from '../repositories/newsletter.server';

const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
  })
);

export async function action({ request }: ActionArgs) {
  return appHandler(request, async (user) => {
    const result = await validator.validate(await request.formData());

    if (result.error) {
      return validationError(result.error);
    }

    const newsletterData = {
      ...result.data,
      userId: user.id,
    };

    const newsletter = await NewsletterRepository.create({
      data: newsletterData,
    });

    return json({ ...newsletter });
  });
}

export default function Index() {
  return (
    <>
      <h1>Create Newsletter page </h1>
      <Form method="POST">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="name" />
        </div>
        <br />
        <div>
          <label htmlFor="content">Content</label>
          <textarea name="content" placeholder="content" />
        </div>
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
