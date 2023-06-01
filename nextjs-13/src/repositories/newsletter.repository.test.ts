import { dbClientMock } from '@test/database';
import { newsletterFactory } from '@test/factories/newsletter.factory';

import { createNewsletter } from './newsletter.repository';

describe('Newsletter Respository', () => {
  describe('createNewsletter', () => {
    it('creates a newsletter', async () => {
      const newsletterAttributes = {
        name: 'iOS 17 release',
        content:
          'iOS 17 will reportedly have a new feature that turns locked iPhones into smart home displays. The interface will display information such as appointments, the weather, and notifications. It will operate similarly to smart home devices from other companies.',
        user: { connect: { id: '1' } }
      };
      const newsletter = { ...newsletterFactory, ...newsletterAttributes };

      dbClientMock.newsletter.create.mockResolvedValue(newsletter);

      await expect(createNewsletter(newsletterAttributes)).resolves.toEqual(
        newsletter
      );
    });
  });
});
