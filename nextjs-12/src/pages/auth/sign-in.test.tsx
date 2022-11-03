import { render, screen } from '@testing-library/react';

import SignInPage from './sign-in';

describe('Sign in page', () => {
  it('renders a button to login with Google', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('loginButton')).toHaveTextContent(
      'Login with Google'
    );
  });
});
