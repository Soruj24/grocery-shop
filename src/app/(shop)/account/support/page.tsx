"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeadphonesIcon, MessageSquare, Phone, Mail, FileText, Send, CheckCircle2 } from "lucide-react";

const tickets = [
  { id: "TKT-001", subject: "Order not received", status: "open", date: "2026-07-18", lastReply: "2 hours ago" },
  { id: "TKT-002", subject: "Wrong item delivered", status: "resolved", date: "2026-07-10", lastReply: "3 days ago" },
];

export default function SupportPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "", category: "order" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.subject || !form.message) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ subject: "", message: "", category: "order" }); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get help with your orders</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
          <MessageSquare className="h-4 w-4" /> New Ticket
        </button>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Phone, label: "Call Us", value: "+880 1700-000000", color: "bg-blue-50 dark:bg-blue-950/30 text-blue-500" },
          { icon: Mail, label: "Email", value: "support@shop.com", color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500" },
          { icon: HeadphonesIcon, label: "Live Chat", value: "Start chat", color: "bg-violet-50 dark:bg-violet-950/30 text-violet-500" },
        ].map((contact) => (
          <button key={contact.label} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition-all text-left">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${contact.color}`}>
              <contact.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{contact.label}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{contact.value}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Ticket Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Ticket submitted!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">We&apos;ll get back to you soon</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">New Support Ticket</h3>
                <button onClick={() => setShowForm(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-emerald-500 outline-none">
                <option value="order">Order Issue</option>
                <option value="delivery">Delivery Problem</option>
                <option value="payment">Payment Issue</option>
                <option value="product">Product Question</option>
                <option value="other">Other</option>
              </select>
              <input placeholder="Subject *" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
              <textarea placeholder="Describe your issue *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none resize-none" />
              <button onClick={handleSubmit} disabled={!form.subject || !form.message} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors">
                <Send className="h-4 w-4" /> Submit Ticket
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Existing Tickets */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Your Tickets</h2>
        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-sm text-gray-500">No support tickets</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tickets.map((ticket, i) => (
              <motion.div key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <FileText className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{ticket.subject}</p>
                    <p className="text-[10px] text-gray-400">{ticket.id} • {ticket.lastReply}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${ticket.status === "open" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
                  {ticket.status}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
