"use client";

import { useSettingsForm, SettingsShell, Field, Input, Toggle } from "@/features/admin/shared/SettingsForm";

export default function PaymentsSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("payments");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-28 rounded bg-muted animate-pulse" /><div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Payments" description="Configure payment gateways and methods" onSave={save} saving={saving} dirty={true}>
      <Field label="Cash on Delivery" description="Allow customers to pay on delivery">
        <Toggle checked={form.codEnabled !== false} onChange={(v) => setField("codEnabled", v)} label={form.codEnabled !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="bKash" description="Enable bKash mobile payments">
        <Toggle checked={form.bkashEnabled === true} onChange={(v) => setField("bkashEnabled", v)} label={form.bkashEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.bkashEnabled === true && (
        <Field label="bKash Number" description="Your bKash merchant number">
          <Input value={String(form.bkashNumber || "")} onChange={(v) => setField("bkashNumber", v)} placeholder="01700-000000" />
        </Field>
      )}
      <Field label="Nagad" description="Enable Nagad mobile payments">
        <Toggle checked={form.nagadEnabled === true} onChange={(v) => setField("nagadEnabled", v)} label={form.nagadEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.nagadEnabled === true && (
        <Field label="Nagad Number" description="Your Nagad merchant number">
          <Input value={String(form.nagadNumber || "")} onChange={(v) => setField("nagadNumber", v)} placeholder="01700-000000" />
        </Field>
      )}
      <Field label="Card Payments" description="Enable credit/debit card payments">
        <Toggle checked={form.cardEnabled === true} onChange={(v) => setField("cardEnabled", v)} label={form.cardEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.cardEnabled === true && (
        <Field label="Merchant ID" description="Payment gateway merchant ID">
          <Input value={String(form.merchantId || "")} onChange={(v) => setField("merchantId", v)} placeholder="Merchant ID" />
        </Field>
      )}
      <Field label="Test Mode" description="Use sandbox/test environment for payments">
        <Toggle checked={form.testMode !== false} onChange={(v) => setField("testMode", v)} label={form.testMode !== false ? "Test Mode" : "Live Mode"} />
      </Field>
    </SettingsShell>
  );
}
