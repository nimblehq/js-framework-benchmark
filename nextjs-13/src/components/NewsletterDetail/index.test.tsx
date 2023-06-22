import React from 'react';

import { render, waitFor, screen } from '@testing-library/react';

import { newsletterFactory } from '@test/factories/newsletter.factory';

import NewsletterDetail from './index';

describe('NewsletterDetail', () => {
  it('renders the component', async () => {
    render(<NewsletterDetail newsletter={{}} />);

    await waitFor(() => expect(screen.getByTestId('newsletter')).toBeVisible());
  });

  it('renders list of newsletters', async () => {
    const record = {
      id: newsletterFactory.id,
      name: newsletterFactory.name,
      content: newsletterFactory.content,
    };

    render(<NewsletterDetail newsletter={record} />);

    expect(screen.getByText(record.name)).toBeInTheDocument();
    expect(screen.getByText(record.content)).toBeInTheDocument();
  });
});
