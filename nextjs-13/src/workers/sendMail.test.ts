/**
 * @jest-environment node
 */
import { createTransport } from 'nodemailer';

import { findNewsletter } from 'repositories/newsletter.repository';

import sendMail from './sendMail';

jest.mock('repositories/newsletter.repository');
jest.mock('nodemailer');

describe('sendMail', () => {
  it('triggers sendMail', async () => {
    const user = { id: '1', name: 'Dave' };
    const data = {
      email: 'dev@nimblehq.co',
      ids: ['1'],
    };
    const newsLetterName = 'Vision Pro release';

    findNewsletter.mockResolvedValue([
      {
        id: data.ids[0],
        name: newsLetterName,
      },
    ]);

    process.env.NEXTAUTH_URL = 'http://localhost:3300';
    process.env.MAILGUN_DOMAIN = 'nimble.mailgun.org';

    const mockSendMail = jest.fn();
    createTransport.mockImplementation(() => {
      return {
        sendMail: mockSendMail,
      };
    });

    await sendMail({
      data: {
        ids: data.ids,
        to: data.email,
        senderId: user.id,
        senderName: user.name,
      },
    });

    expect(createTransport).toHaveBeenCalled();
    expect(mockSendMail).toHaveBeenCalledWith({
      from: `Nimble Newsletter <mailgun@${process.env.MAILGUN_DOMAIN}`,
      to: data.email,
      subject: `${user.name} just invited you to view a newsletter`,
      html: `<p>Nimble Newsletter just invited you to view a newsletter:</p>\n<ul>\n  <li><a href="${process.env.NEXTAUTH_URL}/newsletter/${data.ids[0]}">${newsLetterName}</a></li>\n</ul>\n`,
    });
  });
});
