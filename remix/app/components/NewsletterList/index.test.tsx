// Write a test newletter list component
import { BrowserRouter } from 'react-router-dom';

import { Newsletter } from '@prisma/client';
import { render, screen } from '@testing-library/react';

import NewsletterList from './index';
import { newsletterFactory } from '../../tests/factories/newsletter.factory';

describe('NewsletterList', () => {
  describe('given a list of newsletters', () => {
    it('renders the componet', async () => {
      const newsletters: Newsletter[] = [newsletterFactory];

      render(<NewsletterList newsletters={newsletters} />, {
        wrapper: BrowserRouter,
      });

      expect(screen.getByTestId('newsletters-list')).toBeInTheDocument();
    });
  });

  describe('given an empty list', () => {
    it('renders no newsletters found', async () => {
      render(<NewsletterList newsletters={[]} />);

      expect(screen.getByText('No newsletters found.')).toBeInTheDocument();
    });
  });
});
