"use client";

import { Image as ImageIcon } from "lucide-react";
import { ADMIN_INPUT_CLASSES } from "./ProductFormField";

interface ProductImageFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductImageField({
  value,
  onChange,
}: ProductImageFieldProps) {
  return (
    <div className="space-y-1.5 md:col-span-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        প্রোডাক্ট ইমেজ প্রিভিউ
      </label>
      <div className="flex items-center gap-5 p-5 bg-muted rounded-xl border border-border">
        <div className="w-20 h-20 bg-card rounded-xl border border-border overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-7 h-7 text-muted-foreground/50" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={ADMIN_INPUT_CLASSES}
            placeholder="ইমেজ URL দিন (যেমন: https://...)"
          />
          <p className="text-[10px] font-medium text-muted-foreground px-0.5">
            সরাসরি ইমেজের লিংক এখানে পেস্ট করুন
          </p>
        </div>
      </div>
    </div>
  );
}
