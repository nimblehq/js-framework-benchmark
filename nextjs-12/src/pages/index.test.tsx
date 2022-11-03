import { render, screen } from '@testing-library/react';

import IndexPage from './';

describe('Index page', () => {
  it('renders the content', () => {
    render(<IndexPage />);

    expect(screen.getByText('JS Framework Benchmark')).toBeInTheDocument();
  });
});
