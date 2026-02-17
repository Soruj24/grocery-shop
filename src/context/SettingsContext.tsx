"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  shopName: string;
  logo: string;
  favicon: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  footerDescription: string;
  copyrightText: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  taxRate: number;
  shopStatus: boolean;
  currencySymbol: string;
}

const defaultSettings: Settings = {
  shopName: "Grocery Shop",
  logo: "",
  favicon: "",
  address: "",
  phone: "",
  email: "",
  facebook: "",
  instagram: "",
  youtube: "",
  whatsapp: "",
  footerDescription: "",
  copyrightText: "",
  deliveryCharge: 50,
  freeDeliveryThreshold: 0,
  taxRate: 0,
  shopStatus: true,
  currencySymbol: "৳",
};

const SettingsContext = createContext<Settings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings") // Public API for settings
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
