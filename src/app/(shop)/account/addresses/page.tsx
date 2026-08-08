"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Home,
  Building,
  Trash2,
  Edit2,
} from "lucide-react";

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
  {
    id: "1",
    label: "home",
    name: "John Doe",
    phone: "+880 1712345678",
    address: "123 Main Street, Apt 4B",
    city: "Dhaka",
    isDefault: true,
  },
  {
    id: "2",
    label: "office",
    name: "John Doe",
    phone: "+880 1712345678",
    address: "456 Business Ave, Floor 5",
    city: "Dhaka",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] =
    useState<Address[]>(defaultAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(
    null
  );
  const [form, setForm] = useState({
    label: "home",
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) return;
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, ...form } : a
        )
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...form,
          isDefault: prev.length === 0,
        },
      ]);
    }
    setForm({
      label: "home",
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (addr: Address) => {
    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  const handleSetDefault = (id: string) =>
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );

  const iconMap: Record<string, React.ElementType> = {
    home: Home,
    office: Building,
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Addresses
          </h1>
          <p className="text-sm text-muted-foreground/50 mt-1">
            {addresses.length} saved addresses
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              label: "home",
              name: "",
              phone: "",
              address: "",
              city: "",
            });
          }}
          className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Address
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">
                  {editingId
                    ? "Edit Address"
                    : "New Address"}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div className="flex gap-2">
                {["home", "office", "other"].map((l) => (
                  <button
                    key={l}
                    onClick={() =>
                      setForm({ ...form, label: l })
                    }
                    className={`rounded-xl border px-3.5 py-2 text-[11px] font-semibold transition-all ${
                      form.label === l
                        ? "border-foreground/20 bg-foreground text-background"
                        : "border-black/[0.06] dark:border-white/[0.06] text-muted-foreground/60 hover:border-foreground/10"
                    }`}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                />
                <input
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
                />
              </div>
              <textarea
                placeholder="Address *"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                rows={2}
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none resize-none transition-all"
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
              />
              <button
                onClick={handleSave}
                disabled={
                  !form.name || !form.phone || !form.address
                }
                className="w-full rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-30 transition-all active:scale-[0.98]"
              >
                {editingId
                  ? "Update Address"
                  : "Save Address"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addresses.map((addr, i) => {
          const Icon = iconMap[addr.label] || MapPin;
          return (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`rounded-2xl border p-4 transition-all ${
                addr.isDefault
                  ? "border-foreground/15 bg-foreground/[0.02] dark:bg-foreground/[0.02] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  : "border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      addr.isDefault
                        ? "bg-foreground text-background"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-foreground capitalize">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold bg-foreground/[0.06] text-foreground px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground/60">
                {addr.name}
              </p>
              <p className="text-[11px] text-muted-foreground/40">
                {addr.phone}
              </p>
              <p className="text-[11px] text-muted-foreground/40 mt-0.5">
                {addr.address}, {addr.city}
              </p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                {!addr.isDefault && (
                  <button
                    onClick={() =>
                      handleSetDefault(addr.id)
                    }
                    className="text-[11px] font-semibold text-foreground hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-[11px] font-medium text-muted-foreground/40 hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-[11px] font-medium text-muted-foreground/40 hover:text-rose-500 flex items-center gap-1 ml-auto transition-colors"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
