import axios from 'axios';

import requestManager from './manager';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    request: jest.fn(() => Promise.resolve(true)),
  },
}));

describe('RequestManager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends a request', () => {
    requestManager('GET', 'api/v1/me');

    expect(axios.request).toHaveBeenNthCalledWith(1, {
      baseURL: '/api/',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      responseType: 'json',
      url: 'api/v1/me',
    });
  });
});
