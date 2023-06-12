import { fireEvent, render, screen } from '@testing-library/react';

import FormInput from './';

jest.mock('remix-validated-form', () => ({
  useField: jest.fn().mockReturnValue({
    error: 'Test error',
    getInputProps: jest.fn().mockReturnValue({}),
  }),
}));

describe('FormInput', () => {
  describe('givens vaild props', () => {
    it('renders the label, input, and error message', () => {
      const label = 'Test Label';
      const name = 'testName';
      const placeholder = 'Test Placeholder';
      const error = 'Test error';

      render(<FormInput label={label} name={name} placeholder={placeholder} />);

      const labelElement = screen.getByText(label);
      const inputElement = screen.getByPlaceholderText(placeholder);
      const errorElement = screen.getByText(error);

      expect(labelElement).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('sets the text input value', () => {
    render(
      <FormInput
        label="Test Label"
        name="testName"
        placeholder="Test Placeholder"
      />
    );

    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement).toHaveValue('test');
  });
});
