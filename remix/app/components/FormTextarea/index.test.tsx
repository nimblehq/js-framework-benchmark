import { fireEvent, render, screen } from '@testing-library/react';

import FormTextarea from './';

jest.mock('remix-validated-form', () => ({
  useField: jest.fn().mockReturnValue({
    error: 'Test error',
    getInputProps: jest.fn().mockReturnValue({}),
  }),
}));

describe('FormTextarea', () => {
  describe('givens FormTextarea attribute', () => {
    it('renders the label, textarea, and error message', () => {
      const label = 'Test Label';
      const name = 'testName';
      const placeholder = 'Test Placeholder';
      const error = 'Test error';

      render(
        <FormTextarea label={label} name={name} placeholder={placeholder} />
      );

      const labelElement = screen.getByText(label);
      const textareaElement = screen.getByPlaceholderText(placeholder);
      const errorElement = screen.getByText(error);

      expect(labelElement).toBeInTheDocument();
      expect(textareaElement).toBeInTheDocument();
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('enter value', () => {
    render(
      <FormTextarea
        label="Test Label"
        name="testName"
        placeholder="Test Placeholder"
      />
    );

    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(textareaElement, { target: { value: 'test' } });

    expect(textareaElement).toHaveValue('test');
  });
});
