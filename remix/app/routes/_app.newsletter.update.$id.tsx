import { useEffect } from 'react';

import { ActionArgs, json } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { StatusCodes } from 'http-status-codes';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';

import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
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

export const loader = async ({ request, params }: ActionArgs) => {
  return appHandler(request, async (user) => {
    const newsletter = await NewsletterRepository.findOne({
      where: { id: params.id, userId: user.id },
    });

    if (!newsletter) {
      return null;
    }

    return json({ ...newsletter });
  });
};

export default function Index() {
  const result = useActionData();
  const newsletter = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newsletter) {
      addNotification({
        text: 'Newsletter not found',
        type: 'error',
      });

      navigate('/');
    }

    if (result) {
      addNotification({
        text: `${result.name} Newsletter updated successfully`,
        type: 'success',
      });

      navigate('/');
    }
  }, [result]);

  return (
    <section className="flex flex-col gap-4">
      <header className="text-xl font-bold">
        <h1>Update your Newsletter </h1>
      </header>
      <ValidatedForm
        validator={validator}
        defaultValues={newsletter}
        method="put"
      >
        <div className="flex flex-col gap-6">
          <FormInput
            label="Name"
            name="name"
            placeholder="Name"
            format="short"
          />
          <FormInput
            label="Content"
            name="content"
            placeholder="Content"
            format="long"
          />
          <SubmitButton name="Update" />
        </div>
      </ValidatedForm>
    </section>
  );
}
