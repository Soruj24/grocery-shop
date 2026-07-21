"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Home, Building, Trash2, Check, Edit2 } from "lucide-react";

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

const defaultAddresses: Address[] = [
  { id: "1", label: "home", name: "John Doe", phone: "+880 1712345678", address: "123 Main Street, Apt 4B", city: "Dhaka", isDefault: true },
  { id: "2", label: "office", name: "John Doe", phone: "+880 1712345678", address: "456 Business Ave, Floor 5", city: "Dhaka", isDefault: false },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "home", name: "", phone: "", address: "", city: "" });

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) return;
    if (editingId) {
      setAddresses((prev) => prev.map((a) => a.id === editingId ? { ...a, ...form } : a));
    } else {
      setAddresses((prev) => [...prev, { id: Date.now().toString(), ...form, isDefault: prev.length === 0 }]);
    }
    setForm({ label: "home", name: "", phone: "", address: "", city: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (addr: Address) => {
    setForm({ label: addr.label, name: addr.name, phone: addr.phone, address: addr.address, city: addr.city });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const iconMap: Record<string, React.ElementType> = { home: Home, office: Building };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Addresses</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{addresses.length} saved addresses</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ label: "home", name: "", phone: "", address: "", city: "" }); }}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Address
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{editingId ? "Edit Address" : "New Address"}</h3>
                <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
              <div className="flex gap-2">
                {["home", "office", "other"].map((l) => (
                  <button key={l} onClick={() => setForm({ ...form, label: l })} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${form.label === l ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
                <input placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
              </div>
              <textarea placeholder="Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none resize-none" />
              <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 outline-none" />
              <button onClick={handleSave} disabled={!form.name || !form.phone || !form.address} className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors">
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr, i) => {
          const Icon = iconMap[addr.label] || MapPin;
          return (
            <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`rounded-2xl border-2 p-4 transition-all ${addr.isDefault ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${addr.isDefault ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{addr.label}</span>
                  {addr.isDefault && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">Default</span>}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{addr.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{addr.phone}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{addr.address}, {addr.city}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                {!addr.isDefault && <button onClick={() => handleSetDefault(addr.id)} className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Set Default</button>}
                <button onClick={() => handleEdit(addr)} className="text-[11px] font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1"><Edit2 className="h-3 w-3" /> Edit</button>
                <button onClick={() => handleDelete(addr.id)} className="text-[11px] font-medium text-red-400 hover:text-red-600 flex items-center gap-1 ml-auto"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
