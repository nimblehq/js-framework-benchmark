import fs from 'fs';

import Handlebars from 'handlebars';
import { createTransport } from 'nodemailer';

import { queryNewsletterList } from 'repositories/newsletter.repository';

const sendMail = async (job) => {
  const { senderId, senderName, ids, to } = job.data;

  const newsletters = await queryNewsletterList(senderId, ids);
  const items = newsletters.map((newsletter) => {
    return {
      id: newsletter.id,
      name: newsletter.name,
    };
  });

  const source = fs.readFileSync('src/mailers/newsletterInvite.hbs', 'utf8');

  const template = Handlebars.compile(source);
  const html = template({ items, baseUrl: process.env.NEXTAUTH_URL });

  const transporter = createTransport({
    host: process.env.MAILGUN_SMTP_HOST,
    port: process.env.MAILGUN_SMTP_PORT,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.MAILGUN_SMTP_USERNAME,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `Nimble Newsletter <mailgun@${process.env.MAILGUN_DOMAIN}`,
    to: to,
    subject: `${senderName} just invited you to view newsletters`,
    html: html,
  });
};

export default sendMail;
