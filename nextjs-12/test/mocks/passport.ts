import { Profile, Strategy } from 'passport';
import { VerifyCallback } from 'passport-google-oauth20';

type MockStrategyProps = {
  accessToken?: string;
  passAuthentication?: boolean;
  refreshToken?: string;
  userId?: string;
};

class StrategyMock extends Strategy {
  accessToken: string;
  passAuthentication: boolean;
  refreshToken: string;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify: any;

  constructor(
    options: MockStrategyProps,
    verify: (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      callback: VerifyCallback
    ) => void
  ) {
    super();

    this.name = 'mock';

    this.accessToken = options.accessToken || '';
    this.passAuthentication = options.passAuthentication || true;
    this.refreshToken = options.refreshToken || '';
    this.userId = options.userId || '1';
    this.verify = verify;
  }

  authenticate() {
    if (this.passAuthentication) {
      const userProfile = {
        id: this.userId,
        provider: 'mock',
        displayName: 'Test User',
      };

      this.verify(
        this.accessToken,
        this.refreshToken,
        userProfile,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any, done: any) => {
          if (error) {
            this.fail(error);
          } else {
            this.success(done);
          }
        }
      );
    } else {
      this.fail('Unauthorized');
    }
  }
}

export default StrategyMock;
