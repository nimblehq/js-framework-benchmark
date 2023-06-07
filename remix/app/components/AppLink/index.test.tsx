import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import AppLink from './';

describe('AppLink', () => {
  it('renders the component', () => {
    render(<AppLink name={'Test'} href={'/'} />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('app-link')).toBeVisible();
  });

  it('navigate to given href', async () => {
    render(<AppLink name={'Test'} href={'/'} />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByTestId('app-link'));

    expect(window.location.href).toBe('http://localhost/');
  });
});
