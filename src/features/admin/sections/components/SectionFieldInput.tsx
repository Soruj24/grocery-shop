"use client";

import { Image as ImageIcon } from "lucide-react";

interface SectionField {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
}

interface SectionFieldInputProps {
  field: SectionField;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function SectionFieldInput({ field, value, onChange }: SectionFieldInputProps) {
  const inputClass = "w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all";

  if (field.type === "text") {
    return <input type="text" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={`Enter ${field.label}`} />;
  }

  if (field.type === "textarea") {
    return <textarea value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder={`Enter ${field.label}`} />;
  }

  if (field.type === "image") {
    return (
      <div className="flex gap-2">
        <input type="text" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} className={`${inputClass} flex-1`} placeholder="Image URL (https://...)" />
        {!!value && (
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
            <img src={value as string} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <select value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">Select {field.label}</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }

  if (field.type === "datetime") {
    const toInputValue = (v?: string) => { try { return v ? new Date(v).toISOString().slice(0, 16) : ""; } catch { return ""; } };
    return (
      <input type="datetime-local" value={toInputValue(value as string)} onChange={(e) => { const iso = e.target.value ? new Date(e.target.value).toISOString() : ""; onChange(iso); }} className={inputClass} />
    );
  }

  return null;
}
