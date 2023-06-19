/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import appHandler from 'lib/handler/app.handler';
import { sendMailQueue } from 'workers/email.worker';

import { POST } from './route';

jest.mock('lib/handler/app.handler');
jest.mock('repositories/newsletter.repository');
jest.mock('workers/email.worker', () => ({
  sendMailQueue: {
    addBulk: jest.fn(),
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

      const response = await POST(requestBody);
      const responseBody = await response.json();

      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
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

          const response = await POST(requestBody);
          const responseBody = await response.json();

          expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
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

          const response = await POST(requestBody);

          expect(response.status).toBe(StatusCodes.OK);
          expect(sendMailQueue.addBulk).toHaveBeenCalledWith([
            {
              data: {
                id: data.ids[0],
                to: data.email,
                senderId: user.id,
                senderName: user.name,
              },
              name: 'sendMail',
            },
          ]);
        });
      });
    });
  });
});
