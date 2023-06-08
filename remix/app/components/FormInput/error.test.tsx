import { render, screen } from '@testing-library/react';

import Error from './error';

describe('FormInput Error', () => {
  it('renders the component', () => {
    render(<Error error="Error test" />);

    expect(screen.getByTestId('form-input-error')).toBeInTheDocument();
  });
});
