import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { deleteNewsletter } from 'app/actions/newsletter';

import NewsletterItem from './index';

jest.mock('lib/request/manager');

jest.mock('sweetalert2-react-content', () => () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

jest.mock('app/actions/newsletter', () => ({
  deleteNewsletter: jest.fn(),
}));

describe('ListNewsletter', () => {
  const item = { id: '1', name: 'Newsletter 1' };
  const refreshRecordListCallback = jest.fn();

  const setup = () => {
    render(
      <NewsletterItem
        item={item}
        openUpdateModal={() => undefined}
        refreshRecordListCallback={refreshRecordListCallback}
      />
    );
  };

  beforeEach(() => {
    setup();
  });

  it('renders the component', async () => {
    expect(screen.getByTestId('newsletter-item')).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByTestId('btn-delete')).toBeInTheDocument();
  });

  describe('click delete button', () => {
    it('deletes record', async () => {
      fireEvent.click(screen.getByTestId('btn-delete'));

      await waitFor(() =>
        expect(deleteNewsletter).toHaveBeenCalledWith(item.id)
      );
    });

    it('refreshes data', async () => {
      fireEvent.click(screen.getByTestId('btn-delete'));

      await waitFor(() => expect(refreshRecordListCallback).toHaveBeenCalled());
    });
  });
});
