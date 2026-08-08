"use client";

import { useSettingsForm, SettingsShell, Field, Input, NumberInput, Toggle } from "@/features/admin/shared/SettingsForm";

export default function TaxSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("tax");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-16 rounded bg-muted animate-pulse" /><div className="h-4 w-56 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Tax" description="Tax configuration and compliance" onSave={save} saving={saving} dirty={true}>
      <Field label="Enable Tax" description="Apply tax to orders">
        <Toggle checked={form.taxEnabled === true} onChange={(v) => setField("taxEnabled", v)} label={form.taxEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.taxEnabled === true && (
        <>
          <Field label="Tax Name" description="Name displayed on invoices (e.g. VAT, GST)">
            <Input value={String(form.taxName || "")} onChange={(v) => setField("taxName", v)} placeholder="VAT" />
          </Field>
          <Field label="Tax Rate" description="Percentage applied to orders">
            <NumberInput value={Number(form.taxRate || 0)} onChange={(v) => setField("taxRate", v)} min={0} max={50} suffix="%" />
          </Field>
          <Field label="Tax Registration Number" description="Your tax registration ID">
            <Input value={String(form.taxRegistrationNumber || "")} onChange={(v) => setField("taxRegistrationNumber", v)} placeholder="TRN-123456" />
          </Field>
          <Field label="Tax Inclusive Pricing" description="Show prices including tax">
            <Toggle checked={form.taxInclusive === true} onChange={(v) => setField("taxInclusive", v)} label={form.taxInclusive ? "Tax Inclusive" : "Tax Exclusive"} />
          </Field>
        </>
      )}
    </SettingsShell>
  );
}
