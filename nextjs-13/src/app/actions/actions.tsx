import { StatusCodes } from 'http-status-codes';

import RequestError, { errorMessageList } from 'lib/request/error';
import withAuth from 'lib/withAuth/withAuth';
import {
  deleteNewsletter as deleteRecord,
  updateNewsletter as updateRecord,
  createNewsletter as createRecord,
} from 'repositories/newsletter.repository';
import { sendMailQueue } from 'workers/email.worker';

export async function deleteNewsletter(id: string) {
  return withAuth(async (currentUser) => {
    const result = await deleteRecord(id, currentUser.id);

    if (!result.count) {
      throw new RequestError({ message: 'Newsletter could not be deleted' });
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

    if (!result.count) {
      throw new RequestError({ message: 'Newsletter could not be updated' });
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
      throw new RequestError({
        message: errorMessageList[StatusCodes.UNPROCESSABLE_ENTITY],
      });
    }
  });
}

const validateEmail = (email: string) => {
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
    if (!validateEmail(email)) {
      throw new RequestError({ message: 'Invalid email' });
    }

    if (!ids.length) {
      throw new RequestError({ message: 'Invalid newsletters' });
    }

    sendMailQueue.addBulk(
      ids.map((id) => {
        return {
          name: 'sendMail',
          data: {
            id,
            to: email,
            senderId: currentUser.id,
            senderName: currentUser.name,
          },
        };
      })
    );
  });
}
