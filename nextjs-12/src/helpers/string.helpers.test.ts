import { slugizePathname } from './string.helpers';

describe('String Helpers', () => {
  describe('slugizePathname', () => {
    describe('given there are multiple URL path parts', () => {
      it('returns a slug', () => {
        const pathName = '/auth/login/';

        expect(slugizePathname(pathName)).toBe('login');
      });
    });

    describe('given there no URL path parts', () => {
      it('returns an empty string', () => {
        const pathName = '/';

        expect(slugizePathname(pathName)).toBe('');
      });
    });

    describe('given the URL contains spaces', () => {
      it('returns a kebabcased slug', () => {
        const pathName = '/auth/login now/';

        expect(slugizePathname(pathName)).toBe('login-now');
      });
    });

    describe('given the URL contains underscored', () => {
      it('returns a kebabcased slug', () => {
        const pathName = '/auth/login_now/';

        expect(slugizePathname(pathName)).toBe('login-now');
      });
    });
  });
});
