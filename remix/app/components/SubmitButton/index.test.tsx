import { render, screen } from '@testing-library/react';
import { useIsSubmitting } from 'remix-validated-form';

import SubmitButton from './';

jest.mock('remix-validated-form', () => ({
  useIsSubmitting: jest.fn(),
}));

describe('SubmitButton', () => {
  it('renders button with name', () => {
    const name = 'Submit';

    (useIsSubmitting as jest.Mock).mockReturnValue(false);

    render(<SubmitButton name={name} />);

    const buttonElement = screen.getByTestId('submit-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(name);
  });

  test('renders button with loading component when submitting', () => {
    const name = 'Submit';

    (useIsSubmitting as jest.Mock).mockReturnValue(true);

    render(<SubmitButton name={name} />);

    const buttonElement = screen.getByTestId('submit-button');
    const loadingElement = screen.getByTestId('submit-loading');

    expect(buttonElement).toBeInTheDocument();
    expect(loadingElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
  });
});
