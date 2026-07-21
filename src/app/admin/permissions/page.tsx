"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Check, X } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const roles = [
  {
    name: "Admin",
    description: "Full access to all features",
    color: "from-violet-500 to-violet-600",
    permissions: { dashboard: true, orders: true, products: true, customers: true, reports: true, settings: true, users: true, marketing: true },
  },
  {
    name: "Manager",
    description: "Manage products and orders",
    color: "from-blue-500 to-blue-600",
    permissions: { dashboard: true, orders: true, products: true, customers: true, reports: true, settings: false, users: false, marketing: true },
  },
  {
    name: "Support",
    description: "Handle customer inquiries",
    color: "from-emerald-500 to-emerald-600",
    permissions: { dashboard: true, orders: true, products: false, customers: true, reports: false, settings: false, users: false, marketing: false },
  },
  {
    name: "Editor",
    description: "Manage content and products",
    color: "from-amber-500 to-amber-600",
    permissions: { dashboard: true, orders: false, products: true, customers: false, reports: false, settings: false, users: false, marketing: false },
  },
];

const permissionLabels: Record<string, string> = {
  dashboard: "Dashboard",
  orders: "Orders",
  products: "Products",
  customers: "Customers",
  reports: "Reports",
  settings: "Settings",
  users: "User Management",
  marketing: "Marketing",
};

export default function PermissionsPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Roles & Permissions" description="Define what each user role can access." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role, i) => (
          <motion.button key={role.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelected(i)} className={`p-5 rounded-2xl border-2 text-left transition-all ${selected === i ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-lg shadow-emerald-500/10" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} mb-3`}><Shield className="h-5 w-5 text-white" /></div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{role.name}</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">{role.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-5">Permissions — {roles[selected].name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(roles[selected].permissions).map(([key, allowed]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
              <span className="text-sm text-gray-700 dark:text-gray-300">{permissionLabels[key]}</span>
              {allowed ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-gray-300 dark:text-gray-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
