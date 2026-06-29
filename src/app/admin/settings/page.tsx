"use client";

import { Globe, Phone, DollarSign, Layout, Save } from "lucide-react";
import AdminHeader from "@/features/admin/components/AdminHeader";
import { useSettings } from "@/features/admin/settings/hooks/useSettings";
import type { SettingsTab } from "@/types/settings";
import TabSidebar from "@/features/admin/settings/components/TabSidebar";
import GeneralTab from "@/features/admin/settings/components/GeneralTab";
import ContactTab from "@/features/admin/settings/components/ContactTab";
import BusinessTab from "@/features/admin/settings/components/BusinessTab";
import FooterTab from "@/features/admin/settings/components/FooterTab";

const tabs: SettingsTab[] = [
  { id: "general", label: "সাধারণ", icon: Globe },
  { id: "contact", label: "যোগাযোগ ও সোশ্যাল", icon: Phone },
  { id: "business", label: "ব্যবসা ও ডেলিভারি", icon: DollarSign },
  { id: "footer", label: "ফুটার", icon: Layout },
];

export default function SettingsPage() {
  const {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    loading,
    saving,
    message,
    handleSubmit,
  } = useSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400 dark:text-gray-500 font-black animate-pulse uppercase tracking-widest">
          লোড হচ্ছে...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-700">
      <AdminHeader title="ওয়েবসাইট সেটিংস" />
      <p className="text-gray-500 dark:text-gray-400 text-sm -mt-4 font-bold">
        পুরো ওয়েবসাইটের কন্টেন্ট এবং কনফিগারেশন এখান থেকে নিয়ন্ত্রণ করুন
      </p>

      {message && (
        <div
          className={`p-6 rounded-[1.5rem] border animate-in slide-in-from-top-4 duration-300 font-black text-sm uppercase tracking-wider flex items-center gap-3 ${
            message.includes("সফল")
              ? "bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50"
              : "bg-rose-50/50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${message.includes("সফল") ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`}
          />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <TabSidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-8"
          >
            {activeTab === "general" && (
              <GeneralTab formData={formData} onChange={setFormData} />
            )}
            {activeTab === "contact" && (
              <ContactTab formData={formData} onChange={setFormData} />
            )}
            {activeTab === "business" && (
              <BusinessTab formData={formData} onChange={setFormData} />
            )}
            {activeTab === "footer" && (
              <FooterTab formData={formData} onChange={setFormData} />
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 dark:shadow-none hover:shadow-emerald-200 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 mt-4"
            >
              <Save className="w-5 h-5" />
              {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
