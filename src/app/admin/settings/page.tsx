"use client";

import { useGetAdminSettingsQuery, useUpdateAdminSettingsMutation } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { Settings, Save } from "lucide-react";
import { useState, useEffect } from "react";

const fields = [
  { key: "storeName", label: "Store Name", type: "text", placeholder: "GroceryBD" },
  { key: "storeEmail", label: "Store Email", type: "email", placeholder: "admin@grocerybd.com" },
  { key: "storePhone", label: "Store Phone", type: "text", placeholder: "+880 1700-000000" },
  { key: "storeAddress", label: "Store Address", type: "text", placeholder: "123, Dhaka" },
  { key: "deliveryFee", label: "Delivery Fee (৳)", type: "number", placeholder: "50" },
  { key: "freeDeliveryMin", label: "Free Delivery Min. Order (৳)", type: "number", placeholder: "500" },
  { key: "currency", label: "Currency", type: "text", placeholder: "BDT" },
  { key: "taxRate", label: "Tax Rate (%)", type: "number", placeholder: "5" },
];

export default function AdminSettingsPage() {
  const { data, isLoading } = useGetAdminSettingsQuery();
  const [update] = useUpdateAdminSettingsMutation();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const values: Record<string, string> = {};
      for (const f of fields) values[f.key] = String((data as Record<string, unknown>)[f.key] || "");
      setForm(values);
    }
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "number") payload[f.key] = Number(form[f.key]) || 0;
      else payload[f.key] = form[f.key] || "";
    }
    try { await update(payload).unwrap(); } catch {}
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Settings" description="Manage store configuration"
        actions={<button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Settings"}</button>}
      />
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        {isLoading ? (
          <div className="space-y-4">{[1, 2, 3, 4].map((i) => <div key={i} className="h-12 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea value={form[f.key] || ""} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" rows={3} placeholder={f.placeholder} />
                ) : (
                  <input type={f.type} value={form[f.key] || ""} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500" placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
