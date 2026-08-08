"use client";

import { useSettingsForm, SettingsShell, Field, NumberInput, Toggle } from "@/features/admin/shared/SettingsForm";

export default function NotificationsSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("notifications");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-32 rounded bg-muted animate-pulse" /><div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-40 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-5 w-5 rounded bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Notifications" description="Configure alert preferences and thresholds" onSave={save} saving={saving} dirty={true}>
      <Field label="Email Notifications" description="Receive notifications via email">
        <Toggle checked={form.emailNotifications !== false} onChange={(v) => setField("emailNotifications", v)} label={form.emailNotifications !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Order Alerts" description="Get notified when new orders arrive">
        <Toggle checked={form.orderAlerts !== false} onChange={(v) => setField("orderAlerts", v)} label={form.orderAlerts !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Stock Alerts" description="Get notified when products go low or out of stock">
        <Toggle checked={form.stockAlerts !== false} onChange={(v) => setField("stockAlerts", v)} label={form.stockAlerts !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Low Stock Threshold" description="Alert when stock falls below this number">
        <NumberInput value={Number(form.lowStockThreshold || 10)} onChange={(v) => setField("lowStockThreshold", v)} min={1} max={100} suffix="units" />
      </Field>
      <Field label="New Customer Alert" description="Get notified when a new customer registers">
        <Toggle checked={form.newCustomerAlert !== false} onChange={(v) => setField("newCustomerAlert", v)} label={form.newCustomerAlert !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Review Alerts" description="Get notified when customers leave reviews">
        <Toggle checked={form.reviewAlerts !== false} onChange={(v) => setField("reviewAlerts", v)} label={form.reviewAlerts !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Daily Report" description="Receive a daily summary email">
        <Toggle checked={form.dailyReport === true} onChange={(v) => setField("dailyReport", v)} label={form.dailyReport ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Weekly Report" description="Receive a weekly summary email">
        <Toggle checked={form.weeklyReport !== false} onChange={(v) => setField("weeklyReport", v)} label={form.weeklyReport !== false ? "Enabled" : "Disabled"} />
      </Field>
    </SettingsShell>
  );
}
