import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Home from './page';

jest.mock('next-auth/react');
jest.mock('next/navigation');

describe('Home', () => {
  describe('Session status is "unauthenticated', () => {
    it('redirects to home page', () => {
      useSession.mockReturnValue({ status: 'unauthenticated' });
      render(<Home />);

      expect(redirect).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  describe('Session status is "authenticated', () => {
    it('renders navigation bar', () => {
      useSession.mockReturnValue({ status: 'authenticated' });
      render(<Home />);

      expect(screen.getByText('Newsletter')).toBeInTheDocument();
    });

    it('renders create newsletter button', () => {
      useSession.mockReturnValue({ status: 'authenticated' });
      render(<Home />);

      expect(screen.getByText('Create newsletter')).toBeInTheDocument();
    });

    it('renders a modal to create newsletter when click create newsletter button', async () => {
      useSession.mockReturnValue({ status: 'authenticated' });

      const setStateMock = jest.fn();
      const useStateMock = (useState) => [useState, setStateMock];
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);

      render(<Home />);

      await userEvent.click(screen.getByText('Create newsletter'));
      expect(setStateMock).toHaveBeenCalledWith(true);
    });
  });
});
