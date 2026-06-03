"use client";

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  hint?: string;
}

const inputClasses =
  "w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm";

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline,
  hint,
}: FormFieldProps) {
  return (
    <div className="group">
      <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} h-32 resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      {hint && <p className="text-xs text-gray-400 mt-2 ml-2">{hint}</p>}
    </div>
  );
}
