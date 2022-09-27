import AuthGoogleService from './google.service';
import { dbClientMock } from '../../../test/database'
import { passportProfileFactory } from '../../../test/factories/passport/profile.factory'
import { userFactory } from '../../../test/factories/user.factory'


describe('User AuthGoogleService', () => {
    describe('verifyOrCreateUser', () => {
      describe('given there is an existing user', () => {
        it('returns the existing user', async () => {
          const userAttributes = {
            email: 'dev@nimblehq.co'
          }
          const existingUser = {...userFactory, ...userAttributes};
          const profile = {...passportProfileFactory, ...userAttributes};
        
          dbClientMock.user.findUnique.mockResolvedValue(existingUser);
    
          await expect(AuthGoogleService.verifyOrCreateUser(profile)).resolves.toEqual(existingUser);
        });
      });

      describe('given there is NO existing user', () => {
        it('created and returns a new user', async () => {
          const profileAttributes = {
            email: 'dev@nimblehq.co'
          }
          const profile = {...passportProfileFactory, ...profileAttributes};
          const newUser = userFactory;
        
          dbClientMock.user.findUnique.mockResolvedValue(null);
          dbClientMock.user.create.mockResolvedValue(newUser);
    
          await expect(AuthGoogleService.verifyOrCreateUser(profile)).resolves.toEqual(newUser);
        });
      });

      describe('given the profile contains NO email', () => {
        it('returns an error', async () => {
          const profileAttributes = {
            emails: undefined
          }
          const profile = {...passportProfileFactory, ...profileAttributes};
        
          await expect(AuthGoogleService.verifyOrCreateUser(profile)).rejects.toThrow('No valid email was provided');
        });
      });

      describe('given the profile contains invalid data', () => {
        it('returns an error', async () => {
          const profileAttributes = {
            emails: []
          }
          const profile = {...passportProfileFactory, ...profileAttributes};
        
          await expect(AuthGoogleService.verifyOrCreateUser(profile)).rejects.toThrow('User could not be verified or created');
        });
      });
    });
  });
  