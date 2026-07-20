"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { motion } from "framer-motion";

export default function FooterContact() {
  const { t } = useLanguage();
  const settings = useSettings();

  const contactInfo = [
    {
      icon: MapPin,
      label: t('address'),
      value: settings.address || t('address_value'),
      color: "green"
    },
    {
      icon: Phone,
      label: t('helpline'),
      value: settings.phone || t('helpline_number'),
      color: "blue"
    },
    {
      icon: Mail,
      label: t('email'),
      value: settings.email || "support@emranshop.com",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-success-subtle text-success-subtle-foreground group-hover:bg-success-subtle";
      case "blue":
        return "bg-info-subtle text-info-subtle-foreground group-hover:bg-info-subtle";
      case "orange":
        return "bg-warning-subtle text-warning-subtle-foreground group-hover:bg-warning-subtle";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]"
      >
        {t('contact_us')}
      </motion.h4>
      <ul className="space-y-6">
        {contactInfo.map((info, idx) => (
          <motion.li 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-5 group"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${getColorClasses(info.color)}`}>
              <info.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{info.label}</p>
              <p className="text-foreground text-sm font-black leading-relaxed whitespace-pre-line group-hover:text-primary transition-colors">{info.value}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
