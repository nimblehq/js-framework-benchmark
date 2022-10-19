import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import AuthLayout from './';

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});

describe('AuthLayout', () => {
  it('renders the component', () => {
    const mockedUseRouter = useRouter as jest.Mock;
    mockedUseRouter.mockImplementation(() => ({ pathname: '' }));

    render(
      <AuthLayout>
        <></>
      </AuthLayout>
    );

    expect(screen.getByTestId('authLayout')).toBeVisible();
  });

  it('adds a class name to the root element', () => {
    const mockedUseRouter = useRouter as jest.Mock;
    mockedUseRouter.mockImplementation(() => ({
      pathname: 'path/to/action-name',
    }));

    render(
      <AuthLayout>
        <></>
      </AuthLayout>
    );

    const rootElement = screen.getByTestId('authLayout');

    expect(rootElement).toHaveClass('action-name');
  });
});
