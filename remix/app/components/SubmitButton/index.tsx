import { useIsSubmitting } from 'remix-validated-form';

import Loading from './loading';

interface SubButtonProps {
  name: string;
}

export default function SubmitButton({ name }: SubButtonProps) {
  const isSubmitting = useIsSubmitting();
  return (
    <button
      className="text-center px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-700 shadow rounded-lg"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? <Loading /> : name}
    </button>
  );
}
