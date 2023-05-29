import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import AuthLayout from './';

describe('AuthLayout', () => {
  it('renders the component', () => {
    render(
      <AuthLayout>
        <></>
      </AuthLayout>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(screen.getByTestId('auth-layout')).toBeVisible();
  });
});
