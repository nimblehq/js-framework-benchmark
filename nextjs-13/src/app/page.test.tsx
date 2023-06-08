import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import requestManager from 'lib/request/manager';

import Home from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('lib/request/manager');

jest.mock('react-spinners', () => ({
  ClipLoader: () => <div data-testid="clip-loader">Loading...</div>,
}));

describe('Home', () => {
  beforeEach(() => {
    requestManager.mockResolvedValue({ records: [] });
  });

  it('renders title', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Your Newsletters')).toBeInTheDocument();
    });
  });

  describe('giving fetching data', () => {
    beforeEach(() => {
      requestManager.mockImplementation(() => new Promise(() => []));
    });

    it('renders ClipLoader', async () => {
      render(<Home />);

      expect(screen.getByTestId('clip-loader')).toBeInTheDocument();
    });

    it('does NOT render the list of newsletter', async () => {
      render(<Home />);

      expect(screen.queryByTestId('list-newsletter')).not.toBeInTheDocument();
    });
  });

  describe('giving NOT fetching data', () => {
    it('does NOT render ClipLoader', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(screen.queryByTestId('clip-loader')).not.toBeInTheDocument();
      });
    });

    it('renders ListNewsletter', async () => {
      render(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('list-newsletter')).toBeVisible();
      });
    });
  });

  it('renders create newsletter button', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Create newsletter')).toBeInTheDocument();
    });
  });

  it('renders a modal to create newsletter when click create newsletter button', async () => {
    const setStateMock = jest.fn();
    const useStateMock = (useState) => [useState, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<Home />);

    await userEvent.click(screen.getByText('Create newsletter'));
    expect(setStateMock).toHaveBeenCalledWith(true);
  });
});
