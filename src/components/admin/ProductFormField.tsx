"use client";

interface Option {
  value: string;
  label: string;
}

interface ProductFormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  min?: number;
  max?: number;
}

export const ADMIN_INPUT_CLASSES =
  "w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600";

export default function ProductFormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  required,
  min,
  max,
}: ProductFormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${ADMIN_INPUT_CLASSES} min-h-[120px] resize-none`}
          placeholder={placeholder}
        />
      ) : type === "select" && options ? (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={`${ADMIN_INPUT_CLASSES} appearance-none cursor-pointer`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={ADMIN_INPUT_CLASSES}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}
