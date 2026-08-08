"use client";

import { useSettingsForm, SettingsShell, Field, Input, Toggle } from "@/features/admin/shared/SettingsForm";

export default function IntegrationsSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("integrations");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-32 rounded bg-muted animate-pulse" /><div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-40 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Integrations" description="Third-party services and analytics" onSave={save} saving={saving} dirty={true}>
      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analytics</p>
      </div>
      <Field label="Enable Analytics" description="Track visitor data and conversions">
        <Toggle checked={form.analyticsEnabled === true} onChange={(v) => setField("analyticsEnabled", v)} label={form.analyticsEnabled ? "Enabled" : "Disabled"} />
      </Field>
      <Field label="Google Analytics ID" description="Your GA4 measurement ID">
        <Input value={String(form.googleAnalyticsId || "")} onChange={(v) => setField("googleAnalyticsId", v)} placeholder="G-XXXXXXXXXX" />
      </Field>
      <Field label="Google Tag Manager ID" description="Your GTM container ID">
        <Input value={String(form.googleTagManagerId || "")} onChange={(v) => setField("googleTagManagerId", v)} placeholder="GTM-XXXXXXX" />
      </Field>
      <Field label="Facebook Pixel ID" description="Facebook conversion tracking pixel">
        <Input value={String(form.facebookPixelId || "")} onChange={(v) => setField("facebookPixelId", v)} placeholder="1234567890" />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">SMS Gateway</p>
      </div>
      <Field label="SMS Gateway" description="SMS provider name">
        <Input value={String(form.smsGateway || "")} onChange={(v) => setField("smsGateway", v)} placeholder="Twilio, Nexmo, etc." />
      </Field>
      <Field label="SMS API Key" description="API key for SMS service">
        <Input value={String(form.smsApiKey || "")} onChange={(v) => setField("smsApiKey", v)} placeholder="sk-..." type="password" />
      </Field>
      <Field label="SMS Sender ID" description="Sender name/number for SMS">
        <Input value={String(form.smsSender || "")} onChange={(v) => setField("smsSender", v)} placeholder="GROCERY" />
      </Field>
    </SettingsShell>
  );
}
