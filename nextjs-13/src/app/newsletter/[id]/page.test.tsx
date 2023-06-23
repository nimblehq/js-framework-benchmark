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

  describe('given fetching data', () => {
    beforeEach(() => {
      requestManager.mockImplementation(() => new Promise(() => []));
    });

    it('renders ClipLoader', async () => {
      render(<ViewNewsletter />);

      expect(screen.getByTestId('clip-loader')).toBeInTheDocument();
    });

    it('does NOT render NewsletterDetail', async () => {
      render(<ViewNewsletter />);

      expect(screen.queryByTestId('newsletter')).not.toBeInTheDocument();
    });
  });

  describe('given NOT fetching data', () => {
    it('does NOT render ClipLoader', async () => {
      render(<ViewNewsletter />);

      await waitFor(() => {
        expect(screen.queryByTestId('clip-loader')).not.toBeInTheDocument();
      });
    });

    it('renders ListNewsletter', async () => {
      render(<ViewNewsletter />);

      await waitFor(() => {
        expect(screen.getByTestId('newsletter')).toBeInTheDocument();
      });
    });
  });
});
