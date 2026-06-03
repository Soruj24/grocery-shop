"use client";

interface ProductTagsFieldProps {
  isDeal: boolean;
  isPopular: boolean;
  isNewArrival: boolean;
  onChange: (field: string, checked: boolean) => void;
}

export default function ProductTagsField({
  isDeal,
  isPopular,
  isNewArrival,
  onChange,
}: ProductTagsFieldProps) {
  return (
    <div className="grid grid-cols-3 gap-3 items-end">
      <label className="col-span-3 text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
        হাইলাইট ট্যাগ
      </label>
      <label className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={isDeal}
          onChange={(e) => onChange("isDeal", e.target.checked)}
        />
        ডিলস
      </label>
      <label className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={isPopular}
          onChange={(e) => onChange("isPopular", e.target.checked)}
        />
        জনপ্রিয়
      </label>
      <label className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={isNewArrival}
          onChange={(e) => onChange("isNewArrival", e.target.checked)}
        />
        নতুন
      </label>
    </div>
  );
}
