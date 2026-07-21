"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Store, Bell, Shield, Palette, Globe, Save, Check, ChevronRight, Upload, MapPin, CreditCard } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const sections = [
  { id: "general", label: "General", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "shipping", label: "Shipping", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
];

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Settings" description="Configure your store settings."
        actions={<button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">{saved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save</>}</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3">
          <nav className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setActive(s.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === s.id ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}>
                  <Icon className="h-4 w-4" /> {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {active === "general" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Name</label><input defaultValue="GroceryBD" className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Email</label><input defaultValue="admin@grocerybd.com" className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label><input defaultValue="+880 1700-000000" className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" /></div>
                    <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Currency</label><select className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"><option>BDT (৳)</option><option>USD ($)</option></select></div>
                  </div>
                  <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Address</label><textarea rows={3} defaultValue="Dhaka, Bangladesh" className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none" /></div>
                </div>
              )}
              {active === "notifications" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                  {["New order received", "Low stock alert", "Customer review", "Return request", "Payment failure"].map((n) => (
                    <div key={n} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30"><span className="text-sm text-gray-700 dark:text-gray-300">{n}</span>
                      <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-10 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" /></label>
                    </div>
                  ))}
                </div>
              )}
              {active === "security" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 flex items-center justify-between"><div><p className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p><p className="text-xs text-gray-400">Add an extra layer of security</p></div>
                      <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-10 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" /></label>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30"><p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Session Timeout</p><select className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm"><option>30 minutes</option><option>1 hour</option><option>4 hours</option><option>24 hours</option></select></div>
                  </div>
                </div>
              )}
              {(active === "appearance" || active === "localization" || active === "shipping" || active === "payments") && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{active} Settings</h3>
                  <p className="text-sm text-gray-400">Configure your {active} preferences here.</p>
                  <div className="p-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-center"><Settings className="h-8 w-8 mx-auto text-gray-300 dark:text-gray-600 mb-2" /><p className="text-xs text-gray-400">Coming soon</p></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
