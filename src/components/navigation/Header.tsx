"use client";

import { useState } from "react";
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
import TopBar from "./TopBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(20);

  const { data: session } = useSession();
  const { totalWishlistItems } = useWishlist();
  const { data: categories = [] } = useGetAdminCategoriesQuery();

  return (
    <>
      <TopBar />
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-200 top-0 md:top-[33px] ${
          isScrolled
            ? "bg-card/80 backdrop-blur-xl shadow-sm border-b border-border py-2"
            : "bg-card/95 backdrop-blur-md py-3"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4">
          <div className="shrink-0">
            <NavbarLogo />
          </div>

          <div className="ml-auto hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <UserActions />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="hidden border-t border-border md:block">
          <DesktopNav
            categories={categories as any}
            isCategoryMenuOpen={isCategoryMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
          />
        </div>
      </motion.header>

      <div
        className="md:h-[73px]"
        style={{ height: "calc(3.75rem + env(safe-area-inset-top))" }}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories as any}
        totalWishlistItems={totalWishlistItems}
        session={session}
      />
    </>
  );
}
