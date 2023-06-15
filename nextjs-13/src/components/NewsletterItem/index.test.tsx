import React from 'react';

import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import requestManager from 'lib/request/manager';

import NewsletterItem from './index';

jest.mock('lib/request/manager');

jest.mock('sweetalert2-react-content', () => () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

describe('ListNewsletter', () => {
  const item = { id: 1, name: 'Newsletter 1' };
  const onAfterCloseCallback = jest.fn();

  const setup = () => {
    render(
      <NewsletterItem item={item} onAfterCloseCallback={onAfterCloseCallback} />
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
    beforeEach(() => {
      fireEvent.click(screen.getByTestId('btn-delete'));
    });

    it('deletes record', async () => {
      await waitFor(() => {
        expect(requestManager).toHaveBeenCalledWith(
          'DELETE',
          `v1/newsletter/${item.id}`
        );
      });
    });

    it('refreshes data', async () => {
      await waitFor(() => expect(onAfterCloseCallback).toHaveBeenCalled());
    });
  });
});
