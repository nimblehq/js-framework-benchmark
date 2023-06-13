import { User } from '@prisma/client';
import { render, screen } from '@testing-library/react';

import Header from './';
import { userFactory } from '../../../test/factories/user.factory';
import { UserContext } from '../../context/user.context';

const renderHeader = (user: User | Record<string, never>) => {
  const contextValue = {
    user: user,
    setUser: jest.fn(),
  };

  render(
    // @ts-expect-error: contextValue does not conform to the required type for simplicity
    <UserContext.Provider value={contextValue}>
      <Header />
    </UserContext.Provider>
  );
};

describe('Header', () => {
  describe('given a user', () => {
    it('renders the user name', () => {
      const userAttributes = {
        name: 'John Doe',
      };
      const user = { ...userFactory, ...userAttributes };

      renderHeader(user);

      const header = screen.getByTestId('appHeader');

      expect(header).toHaveTextContent('John Doe');
    });
  });

  describe('given without a user', () => {
    it('does NOT render the user name', () => {
      renderHeader({});

      const header = screen.getByTestId('appHeader');

      expect(header).not.toContainHTML('<div className="user-profile">');
    });
  });
});
