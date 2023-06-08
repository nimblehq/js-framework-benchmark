import { render, screen } from '@testing-library/react';
import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AppLayout from './';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('AppLayout', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('localhost:3003/send');
  });

  describe('Session status is "unauthenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });

      render(
        <AppLayout>
          <></>
        </AppLayout>
      );

      expect(redirect).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  describe('Session status is "authenticated', () => {
    beforeEach(() => {
      useSession.mockReturnValue({ status: 'authenticated' });
    });

    it('renders the component', () => {
      render(
        <AppLayout>
          <></>
        </AppLayout>
      );

      expect(screen.getByTestId('layout-default')).toBeVisible();
    });

    it('renders nav', () => {
      render(
        <AppLayout>
          <></>
        </AppLayout>
      );

      expect(screen.getByTestId('dashboard__nav')).toBeVisible();
    });

    it('adds class dashboard__tab--selected to the selected Link', () => {
      render(
        <AppLayout>
          <></>
        </AppLayout>
      );

      const sendNewsletterTab = screen.getByTestId('send-newsletter-tab');

      expect(sendNewsletterTab).toBeVisible();
      expect(sendNewsletterTab.className).toContain('dashboard__tab--selected');
    });
  });
});
