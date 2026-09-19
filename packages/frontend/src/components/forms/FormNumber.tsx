interface FormNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  required?: boolean;
  helpText?: string;
}

export function FormNumber({
  label,
  value,
  onChange,
  min = 0,
  required,
  helpText,
}: FormNumberProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        min={min}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {helpText && (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}
