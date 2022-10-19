import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import AppLayout from './';

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});

describe('AppLayout', () => {
  it('renders the header component', () => {
    const mockedUseRouter = useRouter as jest.Mock;
    mockedUseRouter.mockImplementation(() => ({ pathname: '' }));

    render(
      <AppLayout>
        <></>
      </AppLayout>
    );

    expect(screen.getByTestId('appHeader')).toBeVisible();
  });

  it('adds a class name to the root element', () => {
    const mockedUseRouter = useRouter as jest.Mock;
    mockedUseRouter.mockImplementation(() => ({
      pathname: 'path/to/action-name',
    }));

    render(
      <AppLayout>
        <></>
      </AppLayout>
    );

    const rootElement = screen.getByTestId('appLayout');

    expect(rootElement).toHaveClass('action-name');
  });
});
