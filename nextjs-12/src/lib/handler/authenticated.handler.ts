import { authenticationGuardMiddleware } from '../middleware/authentication-guard.middleware';
import { baseHandler } from './base.handler';

export const authenticatedHandler = () => {
  return baseHandler().use(authenticationGuardMiddleware);
};
