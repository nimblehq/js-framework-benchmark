import { render, screen } from '@testing-library/react';

import Error from './error';

describe('FormTextarea Error', () => {
  it('renders the component', () => {
    render(<Error error="Error test" />);

    expect(screen.getByTestId('form-textarea-error')).toBeInTheDocument();
  });
});
