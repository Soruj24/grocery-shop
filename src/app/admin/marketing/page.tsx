"use client";

import { motion } from "framer-motion";
import { Megaphone, Mail, MessageSquare, Target, TrendingUp, Plus, BarChart3, Send, Users } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatCard from "@/features/admin/shared/StatCard";

const campaigns = [
  { id: "1", name: "Summer Sale Campaign", type: "email", status: "active", sent: 2450, opened: 1230, clicked: 456, date: "2026-07-15" },
  { id: "2", name: "Flash Deal SMS", type: "sms", status: "completed", sent: 1800, opened: 980, clicked: 320, date: "2026-07-10" },
  { id: "3", name: "New Arrivals Push", type: "push", status: "scheduled", sent: 0, opened: 0, clicked: 0, date: "2026-07-25" },
];

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title="Marketing" description="Manage campaigns, promotions, and customer engagement."
        actions={<button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"><Plus className="h-4 w-4" /> New Campaign</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sent" value="4,250" change={15.3} icon={Send} color="from-blue-500 to-blue-600" />
        <StatCard title="Open Rate" value="52.7%" change={3.2} icon={Mail} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Click Rate" value="18.4%" change={-1.5} icon={Target} color="from-violet-500 to-violet-600" />
        <StatCard title="Conversions" value="234" change={8.7} icon={TrendingUp} color="from-amber-500 to-amber-600" />
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Campaigns</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {campaigns.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.type === "email" ? "bg-blue-50 dark:bg-blue-950/30" : c.type === "sms" ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-violet-50 dark:bg-violet-950/30"}`}>
                  {c.type === "email" ? <Mail className="h-5 w-5 text-blue-500" /> : c.type === "sms" ? <MessageSquare className="h-5 w-5 text-emerald-500" /> : <Megaphone className="h-5 w-5 text-violet-500" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{c.type} • {c.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-6 text-xs text-gray-500">
                  <span>Sent: <b className="text-gray-900 dark:text-white">{c.sent.toLocaleString()}</b></span>
                  <span>Opened: <b className="text-gray-900 dark:text-white">{c.opened}</b></span>
                  <span>Clicked: <b className="text-gray-900 dark:text-white">{c.clicked}</b></span>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : c.status === "completed" ? "bg-gray-100 text-gray-500" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{c.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
