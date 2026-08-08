"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function FooterContact() {
  const { t } = useLanguage();
  const settings = useSettings();

  const contactInfo = [
    {
      icon: MapPin,
      label: t('address'),
      value: settings.address || t('address_value'),
    },
    {
      icon: Phone,
      label: t('helpline'),
      value: settings.phone || t('helpline_number'),
    },
    {
      icon: Mail,
      label: t('email'),
      value: settings.email || "support@emranshop.com",
    }
  ];

  return (
    <div className="space-y-5">
      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
        {t('contact_us')}
      </h4>
      <ul className="space-y-4">
        {contactInfo.map((info, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <info.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{info.label}</p>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{info.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
