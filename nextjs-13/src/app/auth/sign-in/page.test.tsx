import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { redirect } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

import SignInPage from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('SignInPage', () => {
  describe('Session status is "loading', () => {
    it('renders loading state', () => {
      useSession.mockReturnValue({ status: 'loading' });
      render(<SignInPage />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
  describe('Session status is "authenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'authenticated' });
      render(<SignInPage />);
      expect(redirect).toHaveBeenCalledWith('/');
    });
  });
  describe('Session status is "unauthenticated', () => {
    it('renders h4', () => {
      useSession.mockReturnValue({ status: 'authenticated' });
      render(<SignInPage />);
      expect(screen.getByText('NextNewsletter 🚀')).toBeInTheDocument();
    });
    it('renders sign in button', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });
      render(<SignInPage />);
      expect(screen.getByTestId('loginButton')).toBeInTheDocument();
    });
    it('calls signIn on button click', async () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });
      render(<SignInPage />);
      await userEvent.click(screen.getByTestId('loginButton'));
      expect(signIn).toHaveBeenCalledWith('google');
    });
  });
});
