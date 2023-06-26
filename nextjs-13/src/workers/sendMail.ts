import fs from 'fs';

import Handlebars from 'handlebars';
import { createTransport } from 'nodemailer';

import { findNewsletterByUser } from 'repositories/newsletter.repository';

const sendMail = async (job) => {
  const { id, to, senderId, senderName } = job.data;

  const newsletter = (await findNewsletterByUser(id, senderId))[0];
  if (!newsletter) return;

  const source = fs.readFileSync('src/mailers/newsletterInvite.hbs', 'utf8');
  const template = Handlebars.compile(source);
  const html = template({ newsletter, baseUrl: process.env.NEXTAUTH_URL });

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
    subject: `${senderName} just invited you to view a newsletter`,
    html: html,
  });
};

export default sendMail;
