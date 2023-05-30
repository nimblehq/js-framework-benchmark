import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Home from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('Home', () => {
  describe('Session status is "loading', () => {
    it('renders loading state', () => {
      useSession.mockReturnValue({ status: 'loading' });
      render(<Home />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Session status is "unauthenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });
      render(<Home />);
      expect(redirect).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  describe('Session status is "authenticated', () => {
    it('renders h4', () => {
      useSession.mockReturnValue({ status: 'authenticated' });
      render(<Home />);
      expect(
        screen.getByText('Welcome to NextNewsletter 🚀')
      ).toBeInTheDocument();
    });
  });
});
