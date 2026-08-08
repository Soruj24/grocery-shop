"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Bell,
  Moon,
  Sun,
  Monitor,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PreferencesPage() {
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] =
    useState(true);
  const [smsNotifications, setSmsNotifications] =
    useState(false);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Preferences
        </h1>
        <p className="text-sm text-muted-foreground/50 mt-1">
          Customize your experience
        </p>
      </motion.div>

      {/* Language */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
            <Globe className="h-5 w-5 text-muted-foreground/60" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Language
            </h2>
            <p className="text-[11px] text-muted-foreground/50">
              Select your preferred language
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {[{ id: "bn" as const, label: "বাংলা" }].map(
            (lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  language === lang.id
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-black/[0.06] dark:border-white/[0.06] text-muted-foreground/60 hover:border-foreground/10"
                }`}
              >
                {lang.label}
              </button>
            )
          )}
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
            <Monitor className="h-5 w-5 text-muted-foreground/60" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Theme
            </h2>
            <p className="text-[11px] text-muted-foreground/50">
              Choose your display theme
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            {
              id: "system",
              label: "System",
              icon: Monitor,
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                theme === t.id
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-black/[0.06] dark:border-white/[0.06] text-muted-foreground/60 hover:border-foreground/10"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
            <Bell className="h-5 w-5 text-muted-foreground/60" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Notifications
            </h2>
            <p className="text-[11px] text-muted-foreground/50">
              Manage notification preferences
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            {
              label: "Email Notifications",
              desc: "Receive order updates via email",
              value: emailNotifications,
              onChange: setEmailNotifications,
            },
            {
              label: "SMS Notifications",
              desc: "Receive order updates via SMS",
              value: smsNotifications,
              onChange: setSmsNotifications,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between rounded-xl bg-black/[0.02] dark:bg-white/[0.02] p-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {pref.label}
                </p>
                <p className="text-[11px] text-muted-foreground/50">
                  {pref.desc}
                </p>
              </div>
              <button
                onClick={() => pref.onChange(!pref.value)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  pref.value
                    ? "bg-foreground"
                    : "bg-black/[0.1] dark:bg-white/[0.1]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    pref.value
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-rose-500/10 bg-rose-500/[0.02] p-6"
      >
        <div className="flex items-center gap-3.5 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/[0.06]">
            <Trash2 className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-600 dark:text-rose-400">
              Delete Account
            </h2>
            <p className="text-[11px] text-rose-500/50">
              Permanently delete your account and data
            </p>
          </div>
        </div>
        <button className="rounded-xl border border-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/[0.06] transition-all">
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}
