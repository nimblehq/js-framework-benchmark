import { render, screen } from '@testing-library/react';

import Label from './label';

describe('FormInput Label', () => {
  it('renders the component', () => {
    render(<Label htmlFor="test" label="test" />);

    expect(screen.getByTestId('form-input-label')).toBeInTheDocument();
  });
});
