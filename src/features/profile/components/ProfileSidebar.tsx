"use client";

import { User, Package, Heart, MapPin, CreditCard, LogOut, Star, Calendar, LucideIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  id: string;
  active: boolean;
  onClick: (id: string) => void;
}

const SidebarItem = ({ icon: Icon, label, id, active, onClick }: SidebarItemProps) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
      active
        ? "bg-primary-subtle text-primary-subtle-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-primary"
    }`}
  >
    <Icon size={20} className="text-inherit" />
    <span className="font-bold text-sm tracking-wide">{label}</span>
  </button>
);

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const { t } = useLanguage();
  const menuItems = [
    { id: "profile", label: t('profile_menu_profile'), icon: User },
    { id: "orders", label: t('profile_menu_orders'), icon: Package },
    { id: "wishlist", label: t('profile_menu_wishlist'), icon: Heart },
    { id: "addresses", label: t('profile_menu_addresses'), icon: MapPin },
    { id: "payments", label: t('profile_menu_payments'), icon: CreditCard },
    { id: "loyalty", label: t('profile_menu_loyalty'), icon: Star },
    { id: "subscription", label: t('profile_menu_subscription'), icon: Calendar },
  ];

  return (
    <div className="bg-card/80 backdrop-blur-2xl rounded-2xl border border-border shadow-xl p-4 flex flex-col h-full">
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            {...item}
            active={activeTab === item.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-danger hover:bg-danger-subtle transition-all"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm tracking-wide">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}
