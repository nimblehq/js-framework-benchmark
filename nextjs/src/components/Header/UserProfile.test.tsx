import { render, screen } from '@testing-library/react';

import HeaderUserProfile from './UserProfile';

describe('UserProfile', () => {
  describe('given a user name', () => {
    it('renders the user name', () => {
      render(<HeaderUserProfile name="John Doe" data-testid="profile" />);

      const userProfile = screen.getByTestId('profile');

      expect(userProfile).toHaveTextContent('John Doe');
    });
  });
});
