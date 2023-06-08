import getError from './getError';

export const invalidParamsMessage = 'Invalid params';

function getInvalidParamsError() {
  return getError(invalidParamsMessage);
}

export default getInvalidParamsError;
