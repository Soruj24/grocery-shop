"use client";

import { useSettingsForm, SettingsShell, Field, Input, NumberInput, Select } from "@/features/admin/shared/SettingsForm";

export default function EmailSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("email");

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-16 rounded bg-muted animate-pulse" /><div className="h-4 w-56 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 flex gap-4"><div className="h-4 w-32 rounded bg-muted animate-pulse mt-1.5" /><div className="flex-1"><div className="h-10 rounded-lg bg-muted animate-pulse" /></div></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Email" description="SMTP and email delivery configuration" onSave={save} saving={saving} dirty={true}>
      <Field label="SMTP Host" description="Your SMTP server hostname">
        <Input value={String(form.smtpHost || "")} onChange={(v) => setField("smtpHost", v)} placeholder="smtp.gmail.com" />
      </Field>
      <Field label="SMTP Port" description="SMTP server port">
        <NumberInput value={Number(form.smtpPort || 587)} onChange={(v) => setField("smtpPort", v)} min={1} max={65535} />
      </Field>
      <Field label="Encryption" description="Transport layer security">
        <Select value={String(form.encryption || "tls")} onChange={(v) => setField("encryption", v)}
          options={[
            { value: "tls", label: "TLS" },
            { value: "ssl", label: "SSL" },
            { value: "none", label: "None" },
          ]} />
      </Field>
      <Field label="SMTP Username" description="Authentication username">
        <Input value={String(form.smtpUser || "")} onChange={(v) => setField("smtpUser", v)} placeholder="your@email.com" />
      </Field>
      <Field label="SMTP Password" description="Authentication password (stored securely)">
        <Input value={String(form.smtpPass || "")} onChange={(v) => setField("smtpPass", v)} placeholder="••••••••" type="password" />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sender Identity</p>
      </div>
      <Field label="From Name" description="Name shown as sender">
        <Input value={String(form.fromName || "")} onChange={(v) => setField("fromName", v)} placeholder="Grocery Shop" />
      </Field>
      <Field label="From Email" description="Email address shown as sender">
        <Input value={String(form.fromEmail || "")} onChange={(v) => setField("fromEmail", v)} placeholder="noreply@grocery.com" type="email" />
      </Field>
      <Field label="Reply-To" description="Address for reply emails">
        <Input value={String(form.replyTo || "")} onChange={(v) => setField("replyTo", v)} placeholder="support@grocery.com" type="email" />
      </Field>
    </SettingsShell>
  );
}
