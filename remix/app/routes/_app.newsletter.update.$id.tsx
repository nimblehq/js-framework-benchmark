import { ActionArgs, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import { commitSession } from '../config/session.server';
import appHandler from '../lib/handler/app.handler';
import NewsletterRepository from '../repositories/newsletter.server';

const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
  })
);

export async function action({ request, params }: ActionArgs) {
  return appHandler(request, async (user, session) => {
    const result = await validator.validate(await request.formData());

    if (result.error) {
      return validationError(result.error);
    }

    const newsletterExists = await NewsletterRepository.findOne({
      where: { id: params.id },
    });

    if (!newsletterExists) {
      return validationError({
        fieldErrors: {
          Error: 'Newsletter not found',
        },
      });
    }

    if (newsletterExists.userId === user.id) {
      return validationError({
        fieldErrors: {
          Error: 'You are not allowed to update this newsletter',
        },
      });
    }

    const newsletterUpdated = await NewsletterRepository.update({
      where: { id: params.id },
      data: { ...result.data },
    });

    session.flash(
      'toastMessage',
      `${newsletterUpdated.name} Newsletter updated successfully`
    );
    session.flash('toastMode', 'success');

    return redirect(`/`, {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  });
}

export default function Index() {
  return (
    <div>
      <Form method="PUT">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="name" />
        </div>
        <br />
        <div>
          <label htmlFor="content">Content</label>
          <textarea name="content" placeholder="content" />
        </div>
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}
