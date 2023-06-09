'use server';

import RequestError from 'lib/request/error';
import getError from 'lib/request/getError';
import { invalidParamsMessage } from 'lib/request/getInvalidParamsError';
import withAuth from 'lib/withAuth/withAuth';
import {
  deleteNewsletter as deleteRecord,
  updateNewsletter as updateRecord,
  createNewsletter as createRecord,
  countNewsletters as countRecords,
} from 'repositories/newsletter.repository';
import { sendMailQueue } from 'workers/email.worker';

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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function sendNewsletter({
  email,
  ids,
}: {
  email: string;
  ids: string[];
}) {
  return withAuth(async (currentUser) => {
    try {
      if (!validateEmail(email)) {
        return getError('Invalid email');
      }

      if (ids.length === 0) {
        return getError('Invalid newsletters');
      }

      const newslettersCount = await countRecords(currentUser.id, ids);
      const allIdsAreValid = newslettersCount === ids.length;
      if (!allIdsAreValid) {
        return getError('Invalid newsletters');
      }

      sendMailQueue.add('sendMail', {
        ids,
        to: email,
        senderId: currentUser.id,
        senderName: currentUser.name,
      });
    } catch (err) {
      throw new RequestError({ message: invalidParamsMessage });
    }
  });
}
