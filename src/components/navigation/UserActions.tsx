"use client";

import { ShoppingCart, History, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Popover } from "@/components/ui";
import NotificationBell from "@/components/shared/NotificationBell";
import WishlistIcon from "./WishlistIcon";
import ProfileMenu from "./ProfileMenu";
import CartPreview from "./CartPreview";
import RecentlyViewedMenu from "./RecentlyViewedMenu";
import { CurrencyTag, LanguageTag } from "./LanguageCurrencySelector";
import { useCart } from "@/contexts/CartContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";

function RailButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-all hover:bg-primary-subtle hover:text-primary hover:shadow-md active:scale-95 group border border-transparent hover:border-primary/20"
    >
      {children}
    </button>
  );
}

function BadgeDot({ count, tone = "primary" }: { count: number; tone?: "primary" | "rose" }) {
  if (count <= 0) return null;
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 text-[10px] font-black flex items-center justify-center rounded-full border-2 border-background shadow-lg ${
        tone === "rose"
          ? "bg-rose-500 text-white"
          : "bg-primary text-primary-foreground"
      }`}
    >
      {count}
    </motion.span>
  );
}

export default function UserActions() {
  const { totalItems } = useCart();
  const { recentlyViewed } = useRecentlyViewed();
  const { totalWishlistItems } = useWishlist();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <LanguageTag />
      <CurrencyTag />

      <Popover
        align="end"
        trigger={
          <RailButton label={t("recently_viewed_title")}>
            <History className="w-6 h-6 transition-transform group-hover:scale-110" />
            <BadgeDot count={recentlyViewed.length} />
          </RailButton>
        }
      >
        <RecentlyViewedMenu />
      </Popover>

      <NotificationBell />

      <WishlistIcon />

      <Popover
        align="end"
        trigger={
          <RailButton label={t("cart")}>
            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
            <BadgeDot count={totalItems} />
          </RailButton>
        }
      >
        <CartPreview />
      </Popover>

      <ProfileMenu />
    </div>
  );
}
