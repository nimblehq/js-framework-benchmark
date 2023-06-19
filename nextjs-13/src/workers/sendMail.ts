import Handlebars from 'handlebars';
import { createTransport } from 'nodemailer';

import { queryNewsletters } from 'repositories/newsletter.repository';

const sendMail = async (job) => {
  const { senderId, senderName, ids, to } = job.data;

  const newsletters = await queryNewsletters(senderId, ids);
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
