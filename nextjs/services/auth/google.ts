import { passport } from '../../lib/auth/withPassport'
class AuthGoogleService {
  provider: any

  constructor(provider = passport) {
    this.provider = provider
  }

  authenticate() {
    return this.provider.authenticate('google')
  }
}

export default AuthGoogleService
