import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';

import requestManager from 'lib/request/manager';

import ListNewsletter from './index';

jest.mock('lib/request/manager');

describe('ListNewsletter', () => {
  it('renders the component', async () => {
    requestManager.mockResolvedValue({ records: [] });
    render(<ListNewsletter />);

    await waitFor(() =>
      expect(screen.getByTestId('list-newsletter')).toBeVisible()
    );
  });

  it('renders list of newsletters', async () => {
    const records = [
      { id: 1, name: 'Newsletter 1' },
      { id: 2, name: 'Newsletter 2' },
    ];
    requestManager.mockResolvedValue({ records });

    render(<ListNewsletter />);
    const list = screen.getByTestId('list-newsletter');

    await waitFor(() => expect(list).toHaveTextContent('Newsletter 1'));
    await waitFor(() => expect(list).toHaveTextContent('Newsletter 2'));
  });
});
