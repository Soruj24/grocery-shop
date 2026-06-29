"use client";

import FormField from "./FormField";
import type { SettingsData } from "@/types/settings";

interface FooterTabProps {
  formData: SettingsData;
  onChange: (data: SettingsData) => void;
}

export default function FooterTab({ formData, onChange }: FooterTabProps) {
  const update = (field: keyof SettingsData, value: unknown) =>
    onChange({ ...formData, [field]: value });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormField
        label="ফুটার ডেসক্রিপশন"
        value={formData.footerDescription}
        onChange={(v) => update("footerDescription", v)}
        multiline
        placeholder="আপনার শপ সম্পর্কে কিছু কথা..."
      />
      <FormField
        label="কপিরাইট টেক্সট"
        value={formData.copyrightText}
        onChange={(v) => update("copyrightText", v)}
        placeholder="© 2024 All Rights Reserved"
      />
    </div>
  );
}
