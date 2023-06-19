/**
 * @jest-environment node
 */
import { createTransport } from 'nodemailer';

import { queryNewsletters } from 'repositories/newsletter.repository';

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

    const newsletters = [
      {
        id: data.ids[0],
        name: newsLetterName,
      },
    ];

    queryNewsletters.mockResolvedValue(newsletters);

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
      subject: `${user.name} just invited you to view newsletters`,
      html: `<p>Nimble Newsletter just invited you to view these newsletters:</p>\n<ul>\n    <li><a href="${process.env.NEXTAUTH_URL}/newsletter/${data.ids[0]}">${newsLetterName}</a></li>\n</ul>\n`,
    });
  });
});
