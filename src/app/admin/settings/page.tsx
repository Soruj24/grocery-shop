"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    phone: "",
    deliveryCharge: 0,
    shopStatus: true,
  });
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
      setFormData(data);
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
      }
    } catch (error) {
      setMessage("আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-400 dark:text-gray-500 font-black animate-pulse uppercase tracking-widest">লোড হচ্ছে...</div>
    </div>
  );

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in duration-700">
      <AdminHeader title="ওয়েবসাইট সেটিংস" />
      <p className="text-gray-500 dark:text-gray-400 text-sm -mt-4 font-bold">
        আপনার শপের মূল সেটিংসগুলো এখান থেকে পরিবর্তন করুন
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

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="group">
            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">দোকানের নাম</label>
            <input
              type="text"
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 font-bold text-base text-gray-900 dark:text-white"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              placeholder="যেমন: এমরান গ্রোসারি শপ"
            />
          </div>

          <div className="group">
            <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ঠিকানা</label>
            <textarea
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 font-bold text-base text-gray-900 dark:text-white h-32 resize-none"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="দোকানের পূর্ণ ঠিকানা এখানে লিখুন..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ফোন নম্বর</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 font-bold text-base text-gray-900 dark:text-white"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div className="group">
              <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">ডেলিভারি চার্জ (৳)</label>
              <input
                type="number"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 font-bold text-base text-gray-900 dark:text-white"
                value={formData.deliveryCharge}
                onChange={(e) => setFormData({ ...formData, deliveryCharge: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 group hover:border-emerald-500/20 transition-all duration-300">
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

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 dark:shadow-none hover:shadow-emerald-200 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Save className="w-5 h-5" />
          {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
        </button>
      </form>
    </div>
  );
}
