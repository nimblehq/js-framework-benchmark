import { dbClientMock } from '@test/database';
import { newsletterFactory } from '@test/factories/newsletter.factory';

import {
  createNewsletter,
  queryNewsletterByUserId,
} from './newsletter.repository';

describe('Newsletter Respository', () => {
  describe('createNewsletter', () => {
    it('creates a newsletter', async () => {
      const newsletterAttributes = {
        name: 'iOS 17 release',
        content:
          'iOS 17 will reportedly have a new feature that turns locked iPhones into smart home displays. The interface will display information such as appointments, the weather, and notifications. It will operate similarly to smart home devices from other companies.',
        userId: '1',
      };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };

      dbClientMock.newsletter.create.mockResolvedValue(newsletter);

      await expect(createNewsletter(newsletterAttributes)).resolves.toEqual(
        newsletter
      );
    });
  });

  describe('queryNewsletterByUserId', () => {
    it('returns newsletters', async () => {
      const userId = '1';

      const newsletterAttributes = {
        name: 'iOS 17 release',
        content:
          'iOS 17 will reportedly have a new feature that turns locked iPhones into smart home displays. The interface will display information such as appointments, the weather, and notifications. It will operate similarly to smart home devices from other companies.',
        userId: userId,
      };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };
      const newsletters = [newsletter, newsletter];

      const user = {
        id: userId,
        newsletters,
      };

      dbClientMock.user.findUnique.mockResolvedValue(user);

      await expect(queryNewsletterByUserId(userId)).resolves.toEqual(
        newsletters
      );
    });
  });
});
