import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

import SignInPage from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('SignInPage', () => {
  it('renders h4', () => {
    render(<SignInPage />);

    expect(screen.getByText('NextNewsletter 🚀')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('loginButton')).toBeInTheDocument();
  });

  it('calls signIn on button click', async () => {
    render(<SignInPage />);

    await userEvent.click(screen.getByTestId('loginButton'));

    expect(signIn).toHaveBeenCalledWith('google');
  });
});
