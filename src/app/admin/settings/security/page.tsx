"use client";

import { useSettingsForm, SettingsShell, Field, Input, NumberInput, Toggle } from "@/features/admin/shared/SettingsForm";

export default function SecuritySettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("security");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-24 rounded bg-muted animate-pulse" /><div className="h-4 w-56 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Security" description="Account security and access controls" onSave={save} saving={saving} dirty={true}>
      <Field label="Two-Factor Authentication" description="Add an extra layer of security to your account">
        <Toggle checked={form.twoFactorEnabled === true} onChange={(v) => setField("twoFactorEnabled", v)} label={form.twoFactorEnabled ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Session Timeout" description="Minutes of inactivity before auto-logout">
        <NumberInput value={Number(form.sessionTimeout || 60)} onChange={(v) => setField("sessionTimeout", v)} min={5} max={480} suffix="minutes" />
      </Field>
      <Field label="Minimum Password Length" description="Required length for new passwords">
        <NumberInput value={Number(form.passwordMinLength || 8)} onChange={(v) => setField("passwordMinLength", v)} min={6} max={32} suffix="characters" />
      </Field>
      <Field label="Require Password Change" description="Force password reset on next login">
        <Toggle checked={form.requirePasswordChange === true} onChange={(v) => setField("requirePasswordChange", v)} label={form.requirePasswordChange ? "Required" : "Not required"} />
      </Field>
      <Field label="Login Notifications" description="Get notified of new login sessions">
        <Toggle checked={form.loginNotifications !== false} onChange={(v) => setField("loginNotifications", v)} label={form.loginNotifications !== false ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="IP Whitelist" description="Restrict admin access to specific IPs (comma-separated)">
        <Input value={Array.isArray(form.ipWhitelist) ? form.ipWhitelist.join(", ") : ""} onChange={(v) => setField("ipWhitelist", v ? v.split(",").map((s: string) => s.trim()).filter(Boolean) : [])} placeholder="192.168.1.1, 10.0.0.1" />
      </Field>
    </SettingsShell>
  );
}
