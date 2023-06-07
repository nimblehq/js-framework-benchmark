/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';

import appHandler from 'lib/handler/app.handler';
import { queryNewsletters } from 'repositories/newsletter.repository';

import { POST } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

describe('POST /v1/newsletter/send', () => {
  describe('given invalid email', () => {
    it('returns invalid email error', async () => {
      const user = { id: '1' };
      const requestBody = {
        json: () => {
          return {
            email: 'devnimblehq.co',
            ids: ['1'],
          };
        },
      };

      appHandler.mockImplementation((_, callback) =>
        callback(user, requestBody)
      );

      const res = await POST(requestBody);
      const responseBody = await res.json();

      expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody).toMatchObject({
        message: 'Invalid email',
      });
    });

    describe('given valid email', () => {
      describe('given empty newsletter ids', () => {
        it('returns invalid newsletter error', async () => {
          const user = { id: '1' };
          const requestBody = {
            json: () => {
              return {
                email: 'dev@nimblehq.co',
                ids: [],
              };
            },
          };

          appHandler.mockImplementation((_, callback) =>
            callback(user, requestBody)
          );

          const res = await POST(requestBody);
          const responseBody = await res.json();

          expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
          expect(responseBody).toMatchObject({
            message: 'Invalid newsletters',
          });
        });
      });

      describe('given invalid newsletter ids', () => {
        it('returns invalid newsletter error', async () => {
          const user = { id: '1' };
          const requestBody = {
            json: () => {
              return {
                email: 'dev@nimblehq.co',
                ids: ['1'],
              };
            },
          };

          appHandler.mockImplementation((_, callback) =>
            callback(user, requestBody)
          );

          queryNewsletters.mockResolvedValue([]);

          const res = await POST(requestBody);
          const responseBody = await res.json();

          expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
          expect(responseBody).toMatchObject({
            message: 'Invalid newsletters',
          });
        });
      });

      describe('given valid newsletter ids', () => {
        it('triggers sendMail', async () => {
          const user = { id: '1', name: 'Dave' };
          const data = {
            email: 'dev@nimblehq.co',
            ids: ['1'],
          };
          const newsLetterName = 'Vision Pro release';
          const requestBody = { json: () => data };

          appHandler.mockImplementation((_, callback) =>
            callback(user, requestBody)
          );

          const newsletters = [
            {
              id: data.ids[0],
              name: newsLetterName,
            },
          ];

          queryNewsletters.mockResolvedValue(newsletters);
          process.env.NEXTAUTH_URL = 'http://localhost:3300';
          process.env.MAILGUN_DOMAIN = 'nimble.mailgun.org';

          const res = await POST(requestBody);

          expect(res.status).toBe(StatusCodes.OK);
          expect(nodemailer.createTransport).toHaveBeenCalled();
          expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
            from: `Nimble Newsletter <mailgun@${process.env.MAILGUN_DOMAIN}`,
            to: data.email,
            subject: `${user.name} just invited you to view newsletters`,
            html: `<p>Nimble Newsletter just invited you to view these newsletters:</p><ul><li><a href="${process.env.NEXTAUTH_URL}/newsletter/${data.ids[0]}">${newsLetterName}</a></li></ul>`,
          });
        });
      });
    });
  });
});
