import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import requestManager from 'lib/request/manager';

import NewsletterItem from './index';

jest.mock('lib/request/manager');

jest.mock('sweetalert2-react-content', () => () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

describe('ListNewsletter', () => {
  it('renders the component', async () => {
    const item = { id: 1, name: 'Newsletter 1' };
    render(<NewsletterItem item={item} getData={null} />);

    expect(screen.getByTestId('newsletter-item')).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByTestId('btn-delete')).toBeInTheDocument();
  });

  it('deletes record and refresh data on delete button click', async () => {
    const item = { id: 1, name: 'Newsletter 1' };
    const getData = jest.fn();
    render(<NewsletterItem item={item} getData={getData} />);

    fireEvent.click(screen.getByTestId('btn-delete'));

    await waitFor(() => {
      expect(requestManager).toHaveBeenCalledWith(
        'DELETE',
        `v1/newsletter/${item.id}`
      );
    });

    await waitFor(() => expect(getData).toHaveBeenCalled());
  });
});
