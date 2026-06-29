"use client";

import FormField from "./FormField";
import ImageUrlInput from "./ImageUrlInput";
import type { SettingsData } from "@/types/settings";

interface GeneralTabProps {
  formData: SettingsData;
  onChange: (data: SettingsData) => void;
}

export default function GeneralTab({ formData, onChange }: GeneralTabProps) {
  const update = (field: keyof SettingsData, value: unknown) =>
    onChange({ ...formData, [field]: value });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormField
        label="দোকানের নাম"
        value={formData.shopName}
        onChange={(v) => update("shopName", v)}
        placeholder="আমার শপ"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUrlInput
          label="লোগো URL"
          value={formData.logo}
          onChange={(v) => update("logo", v)}
          placeholder="https://..."
        />
        <ImageUrlInput
          label="ফেভিকন URL"
          value={formData.favicon}
          onChange={(v) => update("favicon", v)}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
