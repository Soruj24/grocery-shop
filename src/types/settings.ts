import type { ComponentType } from "react";

export interface SettingsData {
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

export interface SettingsTab {
  id: string;
  label: string;
  icon: ComponentType<{ size?: string | number }>;
}
