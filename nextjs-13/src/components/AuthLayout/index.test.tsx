import { render, screen } from '@testing-library/react';

import AuthLayout from './';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('AuthLayout', () => {
  it('renders the component', () => {
    render(
      <AuthLayout>
        <></>
      </AuthLayout>
    );

    expect(screen.getByTestId('layout-auth')).toBeVisible();
  });
});
