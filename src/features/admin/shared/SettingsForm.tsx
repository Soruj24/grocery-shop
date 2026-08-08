"use client";

import { useGetAdminSettingsQuery, useUpdateAdminSettingsMutation } from "@/redux/apiSlice";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/system/Toast";
import { cn } from "@/utils/utils";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type SettingsData = Record<string, Record<string, unknown>>;

export function useSettingsForm(group: string) {
  const { data, isLoading, isError } = useGetAdminSettingsQuery();
  const [updateSettings, { isLoading: saving }] = useUpdateAdminSettingsMutation();
  const { success, error: toastError } = useToast();

  const settings = (data || {}) as SettingsData;
  const section = (settings[group] || {}) as Record<string, unknown>;
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (section) setForm({ ...section });
  }, [JSON.stringify(section)]);

  const setField = useCallback((key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    try {
      await updateSettings({ [group]: form }).unwrap();
      success("Settings Saved", "Your changes have been saved successfully.");
      setDirty(false);
    } catch {
      toastError("Save Failed", "Something went wrong. Please try again.");
    }
  }, [form, group, updateSettings, success, toastError]);

  return { form, setField, save, dirty, saving, loading: isLoading, isError };
}

export function SettingsShell({ title, description, children, onSave, saving, dirty }: {
  title: string; description: string; children: React.ReactNode;
  onSave: () => void; saving: boolean; dirty: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <button onClick={onSave} disabled={saving || !dirty} aria-disabled={saving || !dirty}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all shrink-0",
            dirty ? "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]" : "bg-muted text-muted-foreground cursor-not-allowed"
          )}>
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {children}
      </div>
    </div>
  );
}

export function Field({ label, description, children, error }: {
  label: string; description?: string; children: React.ReactNode; error?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5">
      <div className="sm:w-1/3 shrink-0">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="flex-1 space-y-1.5">
        {children}
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-danger">
            <AlertCircle className="h-3 w-3" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = "text", disabled }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
      className="w-full h-10 px-3 rounded-lg border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring outline-none disabled:opacity-50 transition-colors" />
  );
}

export function NumberInput({ value, onChange, min, max, suffix }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
        min={min} max={max}
        className="w-32 h-10 px-3 rounded-lg border border-border bg-muted text-sm text-foreground tabular-nums focus:ring-1 focus:ring-ring outline-none" />
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  );
}

export function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring outline-none resize-none transition-colors" />
  );
}

export function Toggle({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label?: string;
}) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg" role="switch" aria-checked={checked}>
      <div className={cn("relative h-5 w-9 rounded-full transition-colors", checked ? "bg-foreground" : "bg-muted border border-border")}>
        <div className={cn("absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-background transition-transform",
          checked ? "translate-x-4" : "translate-x-0")} />
      </div>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </button>
  );
}

export function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }>;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="h-10 px-3 rounded-lg border border-border bg-muted text-sm text-foreground focus:ring-1 focus:ring-ring outline-none appearance-none cursor-pointer min-w-[160px]">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void; }) {
  return (
    <div className="flex items-center gap-3">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
        className="h-10 w-10 rounded-lg border border-border cursor-pointer" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="h-10 w-28 px-3 rounded-lg border border-border bg-muted text-sm text-foreground tabular-nums font-mono focus:ring-1 focus:ring-ring outline-none" />
    </div>
  );
}
