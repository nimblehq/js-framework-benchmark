import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';

import ListNewsletter from './index';
jest.mock('@components/NewsletterItem', () => {
  const NewsletterItem = ({ item }: { item: { name: string } }) => {
    return <div>{item.name}</div>;
  };
  return NewsletterItem;
});

describe('ListNewsletter', () => {
  it('renders the component', async () => {
    render(<ListNewsletter records={[]} />);

    await waitFor(() =>
      expect(screen.getByTestId('list-newsletter')).toBeVisible()
    );
  });

  it('renders list of newsletters', async () => {
    const records = [
      { id: 1, name: 'Newsletter 1' },
      { id: 2, name: 'Newsletter 2' },
    ];

    render(<ListNewsletter records={records} />);
    const list = screen.getByTestId('list-newsletter');

    await waitFor(() => expect(list).toHaveTextContent('Newsletter 1'));
    await waitFor(() => expect(list).toHaveTextContent('Newsletter 2'));
  });
});
