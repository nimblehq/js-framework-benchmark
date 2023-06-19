import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';

import appHandler from 'lib/handler/app.handler';
import getError from 'lib/request/getError';
import getInvalidParamsError from 'lib/request/getInvalidParamsError';
import { countNewsletters } from 'repositories/newsletter.repository';
import { sendMailQueue } from 'workers/email.worker';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function POST(req: NextRequest) {
  return appHandler(req, async (currentUser) => {
    try {
      const body = await req.json();
      const email = body.email;

      if (!validateEmail(email)) {
        return getError('Invalid email');
      }

      const ids = [...new Set(body.ids)];
      if (!ids.length) {
        return getError('Invalid newsletters');
      }

      const newslettersCount = await countNewsletters(currentUser.id, ids);
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

      return NextResponse.json(
        { status: 'success' },
        { status: StatusCodes.OK }
      );
    } catch (err) {
      return getInvalidParamsError();
    }
  });
}
