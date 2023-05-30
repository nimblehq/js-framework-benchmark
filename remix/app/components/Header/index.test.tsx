import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Header from './';
import { userFactory } from '../../tests/factories/user.factory';

describe('Header', () => {
  it('renders the component', () => {
    const user = { ...userFactory };
    render(<Header user={user} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByTestId('appHeader')).toBeVisible();
  });

  describe('given a user', () => {
    it('renders the user name', () => {
      const userAttributes = {
        name: 'Beckham',
      };
      const user = { ...userFactory, ...userAttributes };

      render(<Header user={user} />, {
        wrapper: BrowserRouter,
      });

      expect(screen.getByTestId('appHeader')).toHaveTextContent('Beckham');
    });
  });
});
