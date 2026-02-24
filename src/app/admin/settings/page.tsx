"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Phone, DollarSign, Layout, Image as ImageIcon } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Image from "next/image";

interface SettingsData {
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

export default function SettingsPage() {
  const [formData, setFormData] = useState<SettingsData>({
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
  });
  
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
      setFormData(prev => ({ ...prev, ...data }));
    } catch (error) {
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
    } catch (error) {
      setMessage("আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "সাধারণ", icon: Globe },
    { id: "contact", label: "যোগাযোগ ও সোশ্যাল", icon: Phone },
    { id: "business", label: "ব্যবসা ও ডেলিভারি", icon: DollarSign },
    { id: "footer", label: "ফুটার", icon: Layout },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-400 dark:text-gray-500 font-black animate-pulse uppercase tracking-widest">লোড হচ্ছে...</div>
    </div>
  );

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-700">
      <AdminHeader title="ওয়েবসাইট সেটিংস" />
      <p className="text-gray-500 dark:text-gray-400 text-sm -mt-4 font-bold">
        পুরো ওয়েবসাইটের কন্টেন্ট এবং কনফিগারেশন এখান থেকে নিয়ন্ত্রণ করুন
      </p>
      
      {message && (
        <div className={`p-6 rounded-[1.5rem] border animate-in slide-in-from-top-4 duration-300 font-black text-sm uppercase tracking-wider flex items-center gap-3 ${
          message.includes("সফল") 
            ? "bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50" 
            : "bg-rose-50/50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50"
        }`}>
          <div className={`w-2 h-2 rounded-full ${message.includes("সফল") ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-8">
            
            {/* General Tab */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="group">
                  <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">দোকানের নাম</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                    placeholder="আমার শপ"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="group">
                    <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">লোগো URL</label>
                    <div className="flex gap-3 items-center">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                            {formData.logo ? (
                                <Image src={formData.logo} alt="Logo" fill className="object-cover" />
                            ) : (
                                <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                            )}
                        </div>
                        <input
                            type="text"
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                            placeholder="https://..."
                        />
                    </div>
                  </div>

                   <div className="group">
                    <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ফেভিকন URL</label>
                    <div className="flex gap-3 items-center">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                            {formData.favicon ? (
                                <Image src={formData.favicon} alt="Favicon" fill className="object-cover" />
                            ) : (
                                <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                            )}
                        </div>
                        <input
                            type="text"
                            value={formData.favicon}
                            onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                            placeholder="https://..."
                        />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ফোন নম্বর</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                            placeholder="+880..."
                        />
                    </div>
                    <div className="group">
                        <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ইমেইল</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                            placeholder="info@example.com"
                        />
                    </div>
                </div>

                <div className="group">
                  <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ঠিকানা</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold h-32 resize-none"
                    placeholder="দোকানের ঠিকানা..."
                  />
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                    <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-4">সোশ্যাল মিডিয়া লিংক</h3>
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Facebook URL</label>
                            <input
                                type="text"
                                value={formData.facebook}
                                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Instagram URL</label>
                            <input
                                type="text"
                                value={formData.instagram}
                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">YouTube URL</label>
                            <input
                                type="text"
                                value={formData.youtube}
                                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">WhatsApp নম্বর</label>
                            <input
                                type="text"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
                                placeholder="+88017XXXXXXXX"
                            />
                        </div>
                    </div>
                </div>
              </div>
            )}

            {/* Business Tab */}
            {activeTab === "business" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ডেলিভারি চার্জ (৳)</label>
                        <input
                            type="number"
                            value={formData.deliveryCharge}
                            onChange={(e) => setFormData({ ...formData, deliveryCharge: Number(e.target.value) })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                        />
                    </div>
                    <div className="group">
                        <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ফ্রি ডেলিভারি হবে (টাকার উপরে)</label>
                        <input
                            type="number"
                            value={formData.freeDeliveryThreshold}
                            onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: Number(e.target.value) })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                            placeholder="0 = বন্ধ"
                        />
                        <p className="text-xs text-gray-400 mt-2 ml-2">০ দিলে এই ফিচার বন্ধ থাকবে</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 group hover:border-emerald-500/20 transition-all duration-300">
                    <div>
                        <p className="font-black text-gray-800 dark:text-white text-lg tracking-tight">দোকান খোলা/বন্ধ</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-1">দোকান বন্ধ থাকলে কাস্টমার অর্ডার করতে পারবে না</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, shopStatus: !formData.shopStatus })}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 focus:outline-none ring-4 ring-transparent group-hover:ring-emerald-500/5 ${
                        formData.shopStatus ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"
                        }`}
                    >
                        <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-500 ${
                            formData.shopStatus ? "translate-x-7" : "translate-x-1"
                        }`}
                        />
                    </button>
                </div>
              </div>
            )}

            {/* Footer Tab */}
            {activeTab === "footer" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="group">
                  <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ফুটার ডেসক্রিপশন</label>
                  <textarea
                    value={formData.footerDescription}
                    onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold h-32 resize-none"
                    placeholder="আপনার শপ সম্পর্কে কিছু কথা..."
                  />
                </div>
                <div className="group">
                  <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">কপিরাইট টেক্সট</label>
                  <input
                    type="text"
                    value={formData.copyrightText}
                    onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                    placeholder="© 2024 All Rights Reserved"
                  />
                </div>
              </div>
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
