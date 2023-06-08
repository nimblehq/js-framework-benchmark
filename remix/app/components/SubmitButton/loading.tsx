import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
export default function Loading() {
  return (
    <div
      className="flex justify-center items-center gap-2"
      data-testid="submit-loading"
    >
      <ArrowPathIcon className="animate-spin h-4 w-4 " />
      Submitting...
    </div>
  );
}
