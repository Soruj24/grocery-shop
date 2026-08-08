"use client";

import { ShoppingCart, History, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Popover } from "@/components/ui";
import NotificationBell from "@/components/shared/NotificationBell";
import WishlistIcon from "./WishlistIcon";
import ProfileMenu from "./ProfileMenu";
import CartPreview from "./CartPreview";
import RecentlyViewedMenu from "./RecentlyViewedMenu";
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
      className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
    >
      {children}
    </button>
  );
}

function BadgeDot({
  count,
  tone = "primary",
}: {
  count: number;
  tone?: "primary" | "rose";
}) {
  if (count <= 0) return null;
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-semibold flex items-center justify-center rounded-full border-2 border-background ${
        tone === "rose"
          ? "bg-danger text-danger-foreground"
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
    <div className="flex items-center gap-1">
      <Popover
        align="end"
        trigger={
          <RailButton label={t("recently_viewed_title")}>
            <History className="w-5 h-5" />
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
            <ShoppingCart className="w-5 h-5" />
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
