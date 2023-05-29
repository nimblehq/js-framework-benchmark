import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signOut } from 'next-auth/react';

import Dropdown from './';

jest.mock('next-auth/react');

describe('Dropdown', () => {
  describe('given the menu is displayed', () => {
    it('shows sign out button', async () => {
      render(<Dropdown />);

      fireEvent.click(screen.getByTestId('dropdown-toggle'));

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeTruthy();
      });

      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });
    it('calls signOut on button click', async () => {
      render(<Dropdown />);
      await userEvent.click(screen.getByTestId('dropdown-toggle'));
      await userEvent.click(screen.getByTestId('signout-button'));
      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('given the menu is NOT displayed', () => {
    it('does NOT shows sign out button', async () => {
      render(<Dropdown />);

      expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    });
  });
});
