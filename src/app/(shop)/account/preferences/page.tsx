"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Globe, Bell, Moon, Sun, Monitor, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PreferencesPage() {
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Preferences</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your experience</p>
      </div>

      {/* Language */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30">
            <Globe className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Language</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Select your preferred language</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { id: "bn" as const, label: "বাংলা" },
          ].map((lang) => (
            <button key={lang.id} onClick={() => setLanguage(lang.id)} className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all ${language === lang.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
              {lang.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/30">
            <Monitor className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Theme</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Choose your display theme</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            { id: "system", label: "System", icon: Monitor },
          ].map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all ${theme === t.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30">
            <Bell className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage notification preferences</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Email Notifications", desc: "Receive order updates via email", value: emailNotifications, onChange: setEmailNotifications },
            { label: "SMS Notifications", desc: "Receive order updates via SMS", value: smsNotifications, onChange: setSmsNotifications },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{pref.desc}</p>
              </div>
              <button onClick={() => pref.onChange(!pref.value)} className={`relative h-6 w-11 rounded-full transition-colors ${pref.value ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${pref.value ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/10 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <Trash2 className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-red-700 dark:text-red-400">Delete Account</h2>
            <p className="text-xs text-red-500/70 dark:text-red-400/70">Permanently delete your account and data</p>
          </div>
        </div>
        <button className="rounded-xl border border-red-300 dark:border-red-700 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}
