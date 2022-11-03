import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import HeaderUserProfile from './UserProfile';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    request: jest.fn(() => Promise.resolve(true)),
  },
}));

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});

describe('UserProfile', () => {
  describe('given a user name', () => {
    it('renders the user name', () => {
      render(<HeaderUserProfile name="John" data-testid="profile" />);

      const userProfile = screen.getByTestId('profile');

      expect(userProfile).toHaveTextContent('John');
    });
  });

  describe('given the dropdown menu is displayed', () => {
    it('renders a menu item allowing to sign out', async () => {
      const push = jest.fn();
      const mockedUseRouter = useRouter as jest.Mock;
      mockedUseRouter.mockImplementation(() => ({ push }));

      render(<HeaderUserProfile name="John" data-testid="profile" />);

      fireEvent.click(screen.getByTestId('dropdown-toggle'));

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeTruthy();
      });

      fireEvent.click(screen.getByText('Sign out'));

      await waitFor(() => {
        expect(axios.request).toHaveBeenNthCalledWith(1, {
          baseURL: '/api/',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          responseType: 'json',
          url: 'auth/sign-out',
        });
      });

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith('/');
      });
    });
  });
});
