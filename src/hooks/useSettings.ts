"use client";

import { useState, useEffect } from "react";
import type { SettingsData } from "@/types/settings";

const defaultSettings: SettingsData = {
  shopName: "",
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
  deliveryCharge: 0,
  freeDeliveryThreshold: 0,
  taxRate: 0,
  shopStatus: true,
  currencySymbol: "৳",
};

export function useSettings() {
  const [formData, setFormData] = useState<SettingsData>(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, ...data }));
    } catch {
      console.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("সেটিংস সফলভাবে আপডেট করা হয়েছে");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    loading,
    saving,
    message,
    handleSubmit,
  };
}
