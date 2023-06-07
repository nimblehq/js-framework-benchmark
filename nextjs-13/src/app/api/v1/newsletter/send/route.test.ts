/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import appHandler from 'lib/handler/app.handler';
import { countNewsletters } from 'repositories/newsletter.repository';
import { sendMailQueue } from 'workers/sample.worker';

import { POST } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');
jest.mock('workers/sample.worker', () => ({}));
jest.mock('workers/sample.worker', () => ({
  sendMailQueue: {
    add: jest.fn(),
  },
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

          countNewsletters.mockResolvedValue(0);

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
          const requestBody = { json: () => data };

          appHandler.mockImplementation((_, callback) =>
            callback(user, requestBody)
          );

          countNewsletters.mockResolvedValue(data.ids.length);

          const res = await POST(requestBody);

          expect(res.status).toBe(StatusCodes.OK);
          expect(sendMailQueue.add).toHaveBeenCalledWith('sendMail', {
            ids: data.ids,
            to: data.email,
            senderId: user.id,
            senderName: user.name,
          });
        });
      });
    });
  });
});
