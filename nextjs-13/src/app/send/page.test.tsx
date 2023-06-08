import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';

import requestManager from 'lib/request/manager';

import SendNewsletter from './page';

jest.mock('lib/request/manager');

describe('SendNewsletter', () => {
  it.only('renders the component', async () => {
    requestManager.mockResolvedValue({ records: [] });
    render(<SendNewsletter />);

    await waitFor(() =>
      expect(screen.getByTestId('send-newsletter')).toBeVisible()
    );
  });

  it('renders list of newsletters', async () => {
    const records = [
      { id: 1, name: 'Newsletter 1' },
      { id: 2, name: 'Newsletter 2' },
    ];

    const promise = {
      read() {
        return records;
      },
    };

    render(<SendNewsletter promise={promise} />);
    const list = screen.getByTestId('list-newsletter');

    await waitFor(() => expect(list).toHaveTextContent('Newsletter 1'));
    await waitFor(() => expect(list).toHaveTextContent('Newsletter 2'));
  });
});
