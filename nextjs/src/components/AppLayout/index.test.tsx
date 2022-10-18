import { useRouter } from 'next/router';
import { render, screen } from '@testing-library/react';

import AppLayout from './';

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});

describe('AppLayout', () => {
  it('renders the header component', () => {
    const mockedUseRouter = useRouter as jest.Mock;

    mockedUseRouter.mockImplementation(() => ({ pathname: 'text-action' })); 

    render(<AppLayout><></></AppLayout>);

    expect(screen.getByTestId('appHeader')).toBeVisible();
  });
});
