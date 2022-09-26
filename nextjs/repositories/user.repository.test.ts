import { findUserById, findUserByEmail, createUser } from './user.repository'
import { dbClientMock } from '../tests/database'
import { userFactory } from '../tests/factories/user.factory'

describe('User Respository', () => {
  describe('createUser', () => {
    it('creates a user', async () => {
      const userAttributes = {
        email: 'dev@nimblehq.co',
        name: 'Bear Stern',
        avatarUrl: 'https://loremflickr.com/640/480/abstract'
      }
      const user = {...userFactory, ...userAttributes};
    
      dbClientMock.user.create.mockResolvedValue(user);

      await expect(createUser(userAttributes)).resolves.toEqual(user)
    });
  });
});
