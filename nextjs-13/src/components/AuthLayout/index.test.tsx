import { render, screen } from '@testing-library/react';

import AuthLayout from './';

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
