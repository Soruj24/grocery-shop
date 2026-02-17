import { User, Package, Heart, MapPin, CreditCard, LogOut, Star, Calendar } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLanguage } from "@/components/LanguageContext";

interface SidebarItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
        ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-green-600"
    }`}
  >
    <Icon size={20} className={active ? "text-white" : "text-inherit"} />
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
    <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-2xl rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl p-4 flex flex-col h-full">
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

      <div className="pt-4 border-t border-gray-100 dark:border-white/5">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm tracking-wide">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}
