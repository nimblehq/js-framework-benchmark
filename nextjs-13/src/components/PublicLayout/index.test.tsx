import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import PublicLayout from './';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('PublicLayout', () => {
  it('renders the component', () => {
    useSession.mockReturnValue({ status: 'authenticated' });

    render(
      <PublicLayout>
        <></>
      </PublicLayout>
    );

    expect(screen.getByTestId('public-newsletter')).toBeInTheDocument();
  });

  describe('Session status is "unauthenticated', () => {
    it('renders the banner', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });

      render(
        <PublicLayout>
          <></>
        </PublicLayout>
      );

      expect(screen.getByTestId('banner')).toBeInTheDocument();
    });
  });

  describe('Session status is "authenticated', () => {
    it('does NOT render the banner', () => {
      useSession.mockReturnValue({ status: 'authenticated' });

      render(
        <PublicLayout>
          <></>
        </PublicLayout>
      );

      expect(screen.queryByTestId('banner')).not.toBeInTheDocument();
    });
  });
});
