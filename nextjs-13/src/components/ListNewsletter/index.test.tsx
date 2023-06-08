import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';

import ListNewsletter from './index';

describe('ListNewsletter', () => {
  it('renders the component', async () => {
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

    const promise = {
      read() {
        return records;
      },
    };

    render(<ListNewsletter promise={promise} />);
    const list = screen.getByTestId('list-newsletter');

    await waitFor(() => expect(list).toHaveTextContent('Newsletter 1'));
    await waitFor(() => expect(list).toHaveTextContent('Newsletter 2'));
  });
});
