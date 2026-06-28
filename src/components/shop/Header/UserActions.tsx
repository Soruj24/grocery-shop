"use client";

import { useState } from "react";
import NotificationBell from "@/components/NotificationBell";
import CartDrawer from "../cart/CartDrawer";
import WishlistIcon from "./WishlistIcon";
import CartIcon from "./CartIcon";
import ProfileMenu from "./ProfileMenu";

export default function UserActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <NotificationBell />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistIcon />
      <CartIcon onClick={() => setIsCartOpen(true)} />
      <ProfileMenu />
    </div>
  );
}
