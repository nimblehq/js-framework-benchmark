// eslint-disable-next-line import/order
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Dropdown from '.';

describe('Dropdown', () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dropdown />,
    },
  ]);

  describe('givens the menu is displayed', () => {
    it('shows sign out button', async () => {
      render(<RouterProvider router={router} />);

      fireEvent.click(screen.getByTestId('dropdown-toggle'));

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeTruthy();
      });

      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });
  });

  describe('givens the menu NOT displayed', () => {
    it('does NOT show sign out button', async () => {
      render(<RouterProvider router={router} />);

      expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    });
  });
});
