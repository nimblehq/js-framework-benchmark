interface ErrorProps {
  error?: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <small
      className="text-red-600 text-sm font-semibold"
      data-testid="form-input-error"
    >
      {error}
    </small>
  );
}
