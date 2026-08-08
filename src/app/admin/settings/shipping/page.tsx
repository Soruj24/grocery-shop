"use client";

import { useSettingsForm, SettingsShell, Field, Input, NumberInput, Toggle, TextArea } from "@/features/admin/shared/SettingsForm";

export default function ShippingSettingsPage() {
  const { form, setField, save, saving, loading } = useSettingsForm("shipping");

  const slots = (Array.isArray(form.deliverySlots) ? form.deliverySlots : []) as Array<{ label: string; startTime: string; endTime: string; isActive: boolean }>;

  const updateSlot = (index: number, key: string, value: unknown) => {
    const updated = slots.map((s, i) => i === index ? { ...s, [key]: value } : s);
    setField("deliverySlots", updated);
  };

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
    <SettingsShell title="Shipping" description="Delivery charges, slots, and zones" onSave={save} saving={saving} dirty={true}>
      <Field label="Standard Delivery Fee" description="Base delivery charge">
        <NumberInput value={Number(form.deliveryCharge || 50)} onChange={(v) => setField("deliveryCharge", v)} min={0} suffix="৳" />
      </Field>
      <Field label="Free Delivery Threshold" description="Minimum order for free delivery (0 to disable)">
        <NumberInput value={Number(form.freeDeliveryThreshold || 0)} onChange={(v) => setField("freeDeliveryThreshold", v)} min={0} suffix="৳" />
      </Field>

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Express Delivery</p>
      </div>
      <Field label="Express Delivery" description="Offer same-day express delivery">
        <Toggle checked={form.expressDeliveryEnabled === true} onChange={(v) => setField("expressDeliveryEnabled", v)} label={form.expressDeliveryEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.expressDeliveryEnabled === true && (
        <Field label="Express Delivery Fee" description="Charge for express delivery">
          <NumberInput value={Number(form.expressDeliveryCharge || 100)} onChange={(v) => setField("expressDeliveryCharge", v)} min={0} suffix="৳" />
        </Field>
      )}

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Same-Day Delivery</p>
      </div>
      <Field label="Same-Day Delivery" description="Offer same-day delivery">
        <Toggle checked={form.sameDayDeliveryEnabled === true} onChange={(v) => setField("sameDayDeliveryEnabled", v)} label={form.sameDayDeliveryEnabled ? "Enabled" : "Disabled"} />
      </Field>
      {form.sameDayDeliveryEnabled === true && (
        <Field label="Same-Day Delivery Fee" description="Charge for same-day delivery">
          <NumberInput value={Number(form.sameDayDeliveryCharge || 150)} onChange={(v) => setField("sameDayDeliveryCharge", v)} min={0} suffix="৳" />
        </Field>
      )}

      <div className="px-5 py-3 bg-muted/50">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Delivery Slots</p>
      </div>
      {slots.map((slot, i) => (
        <div key={i} className="px-5 py-3 flex items-center gap-4 border-b border-border last:border-0">
          <Input value={slot.label} onChange={(v) => updateSlot(i, "label", v)} placeholder="Slot name" />
          <Input value={slot.startTime} onChange={(v) => updateSlot(i, "startTime", v)} placeholder="08:00" />
          <span className="text-xs text-muted-foreground">to</span>
          <Input value={slot.endTime} onChange={(v) => updateSlot(i, "endTime", v)} placeholder="12:00" />
          <Toggle checked={slot.isActive} onChange={(v) => updateSlot(i, "isActive", v)} />
        </div>
      ))}
    </SettingsShell>
  );
}
