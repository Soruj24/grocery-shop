"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Home, Building, Check, Trash2 } from "lucide-react";
import { type SavedAddress } from "@/types/checkout";
import { useLanguage } from "@/contexts/LanguageContext";

interface AddressBookProps {
  addresses: SavedAddress[];
  selectedId: string | null;
  onSelect: (address: SavedAddress) => void;
  onAdd: (address: SavedAddress) => void;
  onDelete: (id: string) => void;
}

const defaultLabels = [
  { id: "home", label: "Home", icon: Home },
  { id: "office", label: "Office", icon: Building },
];

export default function AddressBook({ addresses, selectedId, onSelect, onAdd, onDelete }: AddressBookProps) {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "home",
    name: "",
    phone: "",
    address: "",
    city: "",
    area: "",
  });

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) return;
    const newAddr: SavedAddress = {
      id: `addr_${Date.now()}`,
      label: form.label,
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      area: form.area,
      isDefault: addresses.length === 0,
    };
    onAdd(newAddr);
    setForm({ label: "home", name: "", phone: "", address: "", city: "", area: "" });
    setShowForm(false);
  };

  const getLabelIcon = (label: string) => {
    const found = defaultLabels.find((l) => l.id === label);
    return found ? found.icon : MapPin;
  };

  return (
    <div className="space-y-3">
      {addresses.length > 0 && (
        <div className="space-y-2">
          {addresses.map((addr) => {
            const LabelIcon = getLabelIcon(addr.label);
            const isSelected = selectedId === addr.id;
            return (
              <motion.div
                key={addr.id}
                layout
                onClick={() => onSelect(addr)}
                className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}
                  >
                    <LabelIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{addr.name} - {addr.phone}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 truncate">{addr.address}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                        <Check className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(addr.id); }}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{t("add_new_address")}</h4>
                <button onClick={() => setShowForm(false)} className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Cancel</button>
              </div>
              <div className="flex gap-2">
                {defaultLabels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setForm({ ...form, label: l.id })}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      form.label === l.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <l.icon className="h-3 w-3" />
                    {l.label}
                  </button>
                ))}
              </div>
              <input
                placeholder={`${t("name_required")} *`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <input
                placeholder={`${t("phone_required")} *`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <input
                placeholder={`${t("delivery_address")} *`}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="City (optional)"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
                <input
                  placeholder="Area (optional)"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.phone || !form.address}
                className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t("save_address")}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="add-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowForm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3 text-sm font-medium text-gray-500 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t("add_new_address")}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
