import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';

import requestManager from 'lib/request/manager';

import ViewNewsletter from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('lib/request/manager');

jest.mock('react-spinners', () => ({
  ClipLoader: () => <div data-testid="clip-loader">Loading...</div>,
}));

describe('ViewNewsletter', () => {
  beforeEach(() => {
    requestManager.mockResolvedValue({ record: {} });
    useParams.mockReturnValue({ id: 1 });
  });

  it('renders component', async () => {
    render(<ViewNewsletter />);

    await waitFor(() => {
      expect(screen.getByTestId('view-newsletter')).toBeInTheDocument();
    });
  });

  describe('Suspense', () => {
    describe('giving fetching data', () => {
      beforeEach(() => {
        requestManager.mockImplementation(() => new Promise(() => []));
      });

      it('renders ClipLoader', async () => {
        render(<ViewNewsletter />);

        expect(screen.getByTestId('clip-loader')).toBeInTheDocument();
      });

      it('NOT renders NewsletterDetail', async () => {
        render(<ViewNewsletter />);

        expect(screen.queryByTestId('newsletter')).not.toBeVisible();
      });
    });

    describe('giving NOT fetching data', () => {
      it('NOT renders ClipLoader', async () => {
        render(<ViewNewsletter />);

        await waitFor(() => {
          expect(screen.queryByTestId('clip-loader')).not.toBeInTheDocument();
        });
      });

      it('renders ListNewsletter', async () => {
        render(<ViewNewsletter />);

        await waitFor(() => {
          expect(screen.getByTestId('newsletter')).toBeVisible();
        });
      });
    });
  });
});
