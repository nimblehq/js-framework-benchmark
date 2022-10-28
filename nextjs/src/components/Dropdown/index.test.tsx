import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Dropdown from './';

describe('Dropdown', () => {
  describe('given a list of items', () => {
    describe('given the menu is displayed', () => {
      it('shows a list of menu items', async () => {
        const itemOne = () => <div>Item One</div>;
        const itemTwo = () => <div>Item Two</div>;
        render(<Dropdown items={[itemOne(), itemTwo()]} />);

        fireEvent.click(screen.getByTestId('dropdown-toggle'));

        await waitFor(() => {
          expect(screen.getByTestId('dropdown-menu')).toBeTruthy();
        });

        const dropdownMenu = screen.getByTestId('dropdown-menu');

        expect(dropdownMenu).toHaveTextContent('Item One');
        expect(dropdownMenu).toHaveTextContent('Item Two');
      });
    });

    describe('given the menu is NOT displayed', () => {
      it('does NOT shows a list of menu items', () => {
        const itemOne = () => <div>Item One</div>;
        const itemTwo = () => <div>Item Two</div>;
        render(<Dropdown items={[itemOne(), itemTwo()]} />);

        const dropdown = screen.getByTestId('dropdown');

        expect(dropdown).not.toHaveTextContent('Item One');
        expect(dropdown).not.toHaveTextContent('Item Two');
      });
    });
  });
});
