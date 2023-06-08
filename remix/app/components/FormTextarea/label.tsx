interface LabelProps {
  htmlFor: string;
  label: string;
}
export default function Label({ htmlFor, label }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-semibold"
      data-testid="form-textarea-label"
    >
      {label}
    </label>
  );
}
