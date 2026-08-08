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
  "w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all text-sm text-foreground placeholder:text-muted-foreground";

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
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${ADMIN_INPUT_CLASSES} min-h-[100px] resize-none`}
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
