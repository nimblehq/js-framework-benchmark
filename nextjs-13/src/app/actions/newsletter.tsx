'use server';

import RequestError from 'lib/request/error';
import { invalidParamsMessage } from 'lib/request/getInvalidParamsError';
import withAuth from 'lib/withAuth/withAuth';
import {
  deleteNewsletter as deleteRecord,
  updateNewsletter as updateRecord,
  createNewsletter as createRecord,
} from 'repositories/newsletter.repository';

export async function deleteNewsletter(id: string) {
  return withAuth(async (currentUser) => {
    const result = await deleteRecord(id, currentUser.id);

    if (result.count === 0) {
      throw new RequestError({ message: 'Newsletter not exists' });
    }
  });
}

export async function updateNewsletter({
  id,
  name,
  content,
}: {
  id: string;
  name: string;
  content: string;
}) {
  return withAuth(async (currentUser) => {
    const where = {
      id: id,
      user: currentUser,
    };

    const data = { id, name, content };

    const result = await updateRecord({
      where,
      data,
    });

    if (result.count === 0) {
      throw new RequestError({ message: 'Newsletter not exists' });
    }
  });
}

export async function createNewsletter({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  return withAuth(async (currentUser) => {
    try {
      const attributes = {
        name: name,
        content: content,
        user: { connect: { id: currentUser.id } },
      };

      await createRecord(attributes);
    } catch (err) {
      throw new RequestError({ message: invalidParamsMessage });
    }
  });
}
