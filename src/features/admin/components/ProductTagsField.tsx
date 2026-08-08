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
      <label className="col-span-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        হাইলাইট ট্যাগ
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={isDeal}
          onChange={(e) => onChange("isDeal", e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
        />
        ডিলস
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={isPopular}
          onChange={(e) => onChange("isPopular", e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
        />
        জনপ্রিয়
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
        <input
          type="checkbox"
          checked={isNewArrival}
          onChange={(e) => onChange("isNewArrival", e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
        />
        নতুন
      </label>
    </div>
  );
}
