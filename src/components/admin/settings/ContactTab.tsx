"use client";

import FormField from "./FormField";
import type { SettingsData } from "@/types/settings";

interface ContactTabProps {
  formData: SettingsData;
  onChange: (data: SettingsData) => void;
}

export default function ContactTab({ formData, onChange }: ContactTabProps) {
  const update = (field: keyof SettingsData, value: unknown) =>
    onChange({ ...formData, [field]: value });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="ফোন নম্বর"
          value={formData.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+880..."
        />
        <FormField
          label="ইমেইল"
          value={formData.email}
          onChange={(v) => update("email", v)}
          type="email"
          placeholder="info@example.com"
        />
      </div>

      <FormField
        label="ঠিকানা"
        value={formData.address}
        onChange={(v) => update("address", v)}
        multiline
        placeholder="দোকানের ঠিকানা..."
      />

      <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-4">
          সোশ্যাল মিডিয়া লিংক
        </h3>
        <div className="space-y-4">
          <FormField
            label="Facebook URL"
            value={formData.facebook}
            onChange={(v) => update("facebook", v)}
            placeholder="https://facebook.com/..."
          />
          <FormField
            label="Instagram URL"
            value={formData.instagram}
            onChange={(v) => update("instagram", v)}
            placeholder="https://instagram.com/..."
          />
          <FormField
            label="YouTube URL"
            value={formData.youtube}
            onChange={(v) => update("youtube", v)}
            placeholder="https://youtube.com/..."
          />
          <FormField
            label="WhatsApp নম্বর"
            value={formData.whatsapp}
            onChange={(v) => update("whatsapp", v)}
            placeholder="+88017XXXXXXXX"
          />
        </div>
      </div>
    </div>
  );
}
