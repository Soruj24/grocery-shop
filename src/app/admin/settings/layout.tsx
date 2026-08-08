"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/utils";
import {
  Settings, Store, User, Shield, Bell, CreditCard,
  Truck, Receipt, Mail, Plug, Palette,
} from "lucide-react";

const sections = [
  { href: "/admin/settings/general", label: "General", icon: Settings },
  { href: "/admin/settings/store", label: "Store", icon: Store },
  { href: "/admin/settings/profile", label: "Profile", icon: User },
  { href: "/admin/settings/security", label: "Security", icon: Shield },
  { href: "/admin/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings/shipping", label: "Shipping", icon: Truck },
  { href: "/admin/settings/tax", label: "Tax", icon: Receipt },
  { href: "/admin/settings/email", label: "Email", icon: Mail },
  { href: "/admin/settings/integrations", label: "Integrations", icon: Plug },
  { href: "/admin/settings/appearance", label: "Appearance", icon: Palette },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your store configuration and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <nav className="w-full lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
            {sections.map((s) => {
              const active = pathname === s.href;
              return (
                <Link key={s.href} href={s.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}>
                  <s.icon className="h-4 w-4 shrink-0" />
                  {s.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
