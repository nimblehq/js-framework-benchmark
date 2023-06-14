import { useEffect } from 'react';

import { ActionArgs, json } from '@remix-run/node';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { StatusCodes } from 'http-status-codes';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';

import { addNotification } from '../helpers/localStorage.helper';
import appHandler from '../lib/handler/app.handler';
import NewsletterRepository from '../repositories/newsletter.server';

const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
  })
);

export async function action({ request, params }: ActionArgs) {
  return appHandler(request, async (user) => {
    const result = await validator.validate(await request.formData());

    if (result.error) {
      return validationError(result.error);
    }

    const newsletterUpdated = await NewsletterRepository.update({
      where: { id: params.id, userId: user.id },
      data: { ...result.data },
    });

    if (!newsletterUpdated || newsletterUpdated.count === 0) {
      throw new Response(null, {
        status: StatusCodes.NOT_FOUND,
        statusText: 'Newsletter not found',
      });
    }

    return json({ ...result.data });
  });
}

export default function Index() {
  const result = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      addNotification({
        text: `${result.name} Newsletter updated successfully`,
        type: 'success',
      });

      navigate('/');
    }
  }, [result]);

  return (
    <div>
      <Form method="put">
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
