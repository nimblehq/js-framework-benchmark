import { useEffect } from 'react';

import { ActionArgs, json } from '@remix-run/node';
import { useActionData, useNavigate } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { z } from 'zod';

import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import { setToastItems } from '../helpers/localStorage.helper';
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
  const newsletter = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (newsletter) {
      setToastItems(
        'success',
        `${newsletter.name} Newsletter created successfully`
      );

      navigate('/');
    }
  }, [newsletter]);

  return (
    <section className="flex flex-col gap-4">
      <header className="text-xl font-bold">
        <h1>Create your Newsletter </h1>
      </header>
      <ValidatedForm validator={validator} method="POST">
        <div className="flex flex-col gap-6">
          <FormInput
            label={'Name'}
            name={'name'}
            placeholder={'name'}
            format="short"
          />
          <FormInput
            label={'Content'}
            name={'content'}
            placeholder={'content'}
            format="long"
          />
          <SubmitButton name={'Create'} />
        </div>
      </ValidatedForm>
    </section>
  );
}
