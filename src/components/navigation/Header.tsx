"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetAdminCategoriesQuery } from "@/redux/apiSlice";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import NavbarLogo from "./NavbarLogo";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import MobileSearchOverlay from "./MobileSearchOverlay";
import TopBar from "./TopBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] =
    useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
    useState(false);
  const isScrolled = useScrollPosition(20);

  const { data: session } = useSession();
  const { totalWishlistItems } = useWishlist();
  const { data: categories = [] } =
    useGetAdminCategoriesQuery();

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <TopBar />
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 top-0 md:top-[33px] ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-[#09090b]/80 dark:border-white/[0.04]"
            : "bg-white/95 backdrop-blur-md dark:bg-[#09090b]/95"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 lg:px-6">
          <div className="shrink-0">
            <NavbarLogo />
          </div>

          <div className="ml-auto hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden lg:block">
              <UserActions />
            </div>

            <button
              onClick={() =>
                setIsMobileSearchOpen(true)
              }
              className="rounded-xl p-2.5 text-muted-foreground transition-colors duration-300 hover:bg-black/[0.04] hover:text-foreground md:hidden dark:hover:bg-white/[0.06]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="rounded-xl p-2.5 text-muted-foreground transition-colors duration-300 hover:bg-black/[0.04] hover:text-foreground lg:hidden dark:hover:bg-white/[0.06]"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="hidden border-t border-black/[0.04] dark:border-white/[0.04] md:block">
          <DesktopNav
            categories={categories as any}
            isCategoryMenuOpen={isCategoryMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
          />
        </div>
      </motion.header>

      <div
        className="md:h-[73px]"
        style={{
          height:
            "calc(3.75rem + env(safe-area-inset-top))",
        }}
      />

      <MobileSearchOverlay
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        categories={categories as any}
        totalWishlistItems={totalWishlistItems}
        session={session}
      />
    </>
  );
}
