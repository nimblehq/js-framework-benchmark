import { render } from '@testing-library/react';

import IndexPage from './';

describe('Index page', () => {
  it('renders the content', () => {
    const { getByText } = render(<IndexPage />);

    expect(getByText('JS Framework Benchmark')).toBeInTheDocument();
  });
});
