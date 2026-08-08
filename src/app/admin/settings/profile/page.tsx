"use client";

import { useSettingsForm, SettingsShell, Field, Input, TextArea } from "@/features/admin/shared/SettingsForm";
import { useSession } from "next-auth/react";

export default function ProfileSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("profile");
  const { data: session } = useSession();

  if (loading) {
    return (
      <div className="space-y-6">
        <div><div className="h-6 w-24 rounded bg-muted animate-pulse" /><div className="h-4 w-48 rounded bg-muted animate-pulse mt-2" /></div>
        <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-3 animate-pulse">
          <div className="h-16 w-16 rounded-full bg-muted" /><div className="h-4 w-32 rounded bg-muted" /><div className="h-3 w-24 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <SettingsShell title="Profile" description="Your admin account details" onSave={save} saving={saving} dirty={true}>
      <div className="p-5 flex flex-col items-center gap-4 border-b border-border">
        <div className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center text-background text-xl font-bold">
          {String(form.displayName || session?.user?.name || "A").charAt(0).toUpperCase()}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{String(form.displayName || session?.user?.name || "Admin")}</p>
          <p className="text-xs text-muted-foreground">{String(form.email || session?.user?.email || "")}</p>
        </div>
      </div>
      <Field label="Display Name" description="Your name shown in the admin panel">
        <Input value={String(form.displayName || "")} onChange={(v) => setField("displayName", v)} placeholder="Admin" />
      </Field>
      <Field label="Email" description="Your login email">
        <Input value={String(form.email || "")} onChange={(v) => setField("email", v)} placeholder="admin@example.com" type="email" />
      </Field>
      <Field label="Phone" description="Your phone number">
        <Input value={String(form.phone || "")} onChange={(v) => setField("phone", v)} placeholder="+880 1700-000000" />
      </Field>
      <Field label="Avatar URL" description="Profile picture URL">
        <Input value={String(form.avatar || "")} onChange={(v) => setField("avatar", v)} placeholder="https://..." />
      </Field>
      <Field label="Bio" description="Short bio about yourself">
        <TextArea value={String(form.bio || "")} onChange={(v) => setField("bio", v)} placeholder="Store administrator..." />
      </Field>
    </SettingsShell>
  );
}
