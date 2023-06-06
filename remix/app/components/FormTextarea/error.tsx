interface ErrorProps {
  error?: string;
}
export default function Error({ error }: ErrorProps) {
  return <p className="text-red-600 text-sm font-semibold">{error}</p>;
}
