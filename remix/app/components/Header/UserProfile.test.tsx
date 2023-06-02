import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import HeaderUserProfile from './UserProfile';
import { userFactory } from '../../tests/factories/user.factory';

describe('UserProfile', () => {
  describe('given a user', () => {
    it('renders the user image', () => {
      const user = { ...userFactory };

      render(
        <HeaderUserProfile name={user.name} avatarUrl={user.avatarUrl} />,
        {
          wrapper: BrowserRouter,
        }
      );

      expect(screen.getByTestId('headerUserImage')).toBeVisible();
    });
  });

  describe('given without a user', () => {
    it('renders the user no image', () => {
      render(<HeaderUserProfile name={''} avatarUrl={''} />, {
        wrapper: BrowserRouter,
      });

      expect(screen.getByTestId('headerUserNoImage')).toBeVisible();
    });
  });
});
