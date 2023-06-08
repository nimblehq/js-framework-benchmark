import { render, screen } from '@testing-library/react';

import Label from './label';

describe('FormTextarea Label', () => {
  it('renders the component', () => {
    render(<Label htmlFor="test" label="test" />);

    expect(screen.getByTestId('form-textarea-label')).toBeInTheDocument();
  });
});
