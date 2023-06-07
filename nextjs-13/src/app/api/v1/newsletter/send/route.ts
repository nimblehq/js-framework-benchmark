import * as Handlebars from 'handlebars';
import { StatusCodes } from 'http-status-codes';
import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

import appHandler from 'lib/handler/app.handler';
import getError from 'lib/request/getError';
import getInvalidParamsError from 'lib/request/getInvalidParamsError';
import { queryNewsletters } from 'repositories/newsletter.repository';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const sendMail = (newsletters, email, currentUser) => {
  const items = newsletters.map((newsletter) => {
    return {
      id: newsletter.id,
      name: newsletter.name,
    };
  });

  const source =
    '<p>Nimble Newsletter just invited you to view these newsletters:</p>' +
    '<ul>' +
    '{{#each items}}' +
    `<li><a href="${process.env.NEXTAUTH_URL}/newsletter/{{this.id}}">{{this.name}}</a></li>` +
    '{{/each}}' +
    '</ul>';

  const template = Handlebars.compile(source);
  const html = template({ items });

  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_HOST,
    port: process.env.MAILGUN_SMTP_PORT,

    // change host and port envs to this to use maildev mail catcher
    // host: '0.0.0.0',
    // port: 1026,

    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.MAILGUN_SMTP_USERNAME,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  transporter.sendMail({
    from: `Nimble Newsletter <mailgun@${process.env.MAILGUN_DOMAIN}`,
    to: email,
    subject: `${currentUser.name} just invited you to view newsletters`,
    html: html,
  });
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
      if (ids.length === 0) {
        return getError('Invalid newsletters');
      }

      const newsletters = await queryNewsletters(currentUser.id, ids);
      const allIdsAreValid = newsletters.length === ids.length;
      if (!allIdsAreValid) {
        return getError('Invalid newsletters');
      }

      sendMail(newsletters, email, currentUser);

      return NextResponse.json(
        { status: 'success' },
        { status: StatusCodes.OK }
      );
    } catch (err) {
      return getInvalidParamsError();
    }
  });
}
