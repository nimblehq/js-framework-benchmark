import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('SubmitButton Loading', () => {
  it('render loading text', () => {
    render(<Loading />);

    const loadingText = screen.getByText('Submitting...');

    expect(loadingText).toBeInTheDocument();
  });
});
