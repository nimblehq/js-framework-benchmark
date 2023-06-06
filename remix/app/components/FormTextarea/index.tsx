import { useField } from 'remix-validated-form';

import Error from './error';
import Label from './label';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
}
export default function FormTextarea({ label, name, placeholder }: InputProps) {
  const { error, getInputProps } = useField(name);

  return (
    <div className="flex flex-col gap-2 px-0.5">
      <Label htmlFor={name} label={label} />
      <textarea
        className="w-full rounded-md border-0 p-3 text-gray-900 focus:ring-indigo-600"
        {...getInputProps({ id: name })}
        placeholder={placeholder}
      />
      {error && <Error error={error} />}
    </div>
  );
}
