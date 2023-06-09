'use server';

import RequestError from 'lib/request/error';
import withAuth from 'lib/withAuth/withAuth';
import { deleteNewsletter as deleteRecord } from 'repositories/newsletter.repository';

export async function deleteNewsletter(id) {
  return withAuth(async (currentUser) => {
    const result = await deleteRecord(id, currentUser.id);

    if (result.count === 0) {
      throw new RequestError({ message: 'Newsletter not exists' });
    }
  });
}
