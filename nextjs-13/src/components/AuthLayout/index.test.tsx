import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AuthLayout from './';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('AuthLayout', () => {
  describe('Session status is "authenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'authenticated' });

      render(
        <AuthLayout>
          <></>
        </AuthLayout>
      );

      expect(redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('Session status is "unauthenticated', () => {
    it('renders the component', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });

      render(
        <AuthLayout>
          <></>
        </AuthLayout>
      );

      expect(screen.getByTestId('layout-auth')).toBeVisible();
    });
  });
});
