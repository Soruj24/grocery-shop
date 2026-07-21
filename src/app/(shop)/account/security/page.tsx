"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Key, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [twoFactor, setTwoFactor] = useState(false);

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || passwords.new !== passwords.confirm) return;
    alert("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account security</p>
      </div>

      {/* Password */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30">
            <Lock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Change Password</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Update your password regularly</p>
          </div>
        </div>
        <div className="space-y-3 max-w-md">
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Current Password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 pr-10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
          <input type="password" placeholder="New Password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
          <input type="password" placeholder="Confirm New Password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
          <button onClick={handlePasswordChange} disabled={!passwords.current || !passwords.new || passwords.new !== passwords.confirm} className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors">
            Update Password
          </button>
        </div>
      </motion.div>

      {/* Two-Factor */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/30">
              <Key className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
            </div>
          </div>
          <button onClick={() => setTwoFactor(!twoFactor)} className={`relative h-6 w-11 rounded-full transition-colors ${twoFactor ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFactor ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
        {twoFactor && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <p className="text-xs text-emerald-700 dark:text-emerald-400">Two-factor authentication is enabled</p>
          </div>
        )}
      </motion.div>

      {/* Active Sessions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30">
            <Shield className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage your active sessions</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-emerald-50 dark:bg-emerald-950/20 p-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Chrome on Windows • Dhaka, BD</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">Active Now</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
