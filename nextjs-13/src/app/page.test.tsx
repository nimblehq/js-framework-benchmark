import React, { useEffect, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ListNewsletter from '@components/ListNewsletter';
import promiseWrapper from 'lib/request/promiseWrapper';

import Home from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');

jest.mock('@components/ListNewsletter');

jest.mock('react-spinners', () => ({
  ClipLoader: () => <div data-testid="clip-loader">Loading...</div>,
}));

describe('Home', () => {
  describe('Session status is "unauthenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });
      render(<Home />);
      expect(redirect).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  describe('Session status is "authenticated', () => {
    beforeEach(() => {
      useSession.mockReturnValue({ status: 'authenticated' });
    });

    it('renders navigation bar', () => {
      render(<Home />);

      expect(screen.getByText('Newsletter')).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<Home />);

      expect(screen.getByText('Your Newsletters')).toBeInTheDocument();
    });

    describe('Suspense', () => {
      describe('giving fetching data', () => {
        beforeEach(() => {
          ListNewsletter.mockImplementation(() =>
            jest.fn(() => {
              const [records, setRecords] = useState([]);

              useEffect(() => {
                const promise = new Promise(() => []);
                setRecords(promiseWrapper(promise));
              }, []);

              return <div data-testid="list-newsletter">{records}</div>;
            })()
          );
        });

        it('renders ClipLoader', async () => {
          render(<Home />);

          expect(screen.getByTestId('clip-loader')).toBeInTheDocument();
        });

        it('NOT renders ListNewsletter', async () => {
          render(<Home />);

          expect(screen.queryByTestId('list-newsletter')).not.toBeVisible();
        });
      });

      describe('giving NOT fetching data', () => {
        beforeEach(() => {
          ListNewsletter.mockImplementation(() =>
            jest.fn(() => {
              return <div data-testid="list-newsletter" />;
            })()
          );
        });

        it('NOT renders ClipLoader', async () => {
          render(<Home />);

          expect(screen.queryByTestId('clip-loader')).not.toBeInTheDocument();
        });

        it('renders ListNewsletter', async () => {
          render(<Home />);

          expect(screen.getByTestId('list-newsletter')).toBeVisible();
        });
      });
    });

    it('renders create newsletter button', () => {
      render(<Home />);

      expect(screen.getByText('Create newsletter')).toBeInTheDocument();
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
});
