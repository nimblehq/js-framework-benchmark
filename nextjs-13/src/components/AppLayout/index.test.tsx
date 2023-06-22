import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import AppLayout from './';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('AppLayout', () => {
  beforeEach(() => {
    // Because AppLayout use usePathname to get the current
    // path name to differentiate the background-color
    // of the selected tabs and non-selected tabs
    usePathname.mockReturnValue('localhost:3003/send');
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
