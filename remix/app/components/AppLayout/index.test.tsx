import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import AppLayout from './';
import { userFactory } from '../../tests/factories/user.factory';

describe('AppLayout', () => {
  it('renders the component', () => {
    const user = { ...userFactory };

    render(
      <AppLayout user={user}>
        <></>
      </AppLayout>,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(screen.getByTestId('app-layout')).toBeVisible();
  });
});
