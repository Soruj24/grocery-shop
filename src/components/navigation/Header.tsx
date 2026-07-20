"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Menu, Search } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetCategoriesQuery } from "@/redux/apiSlice";
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
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <>
      <TopBar />
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 top-0 md:top-[37px] ${
          isScrolled
            ? "bg-card/95 dark:bg-card/95 backdrop-blur-md shadow-md py-2"
            : "bg-card dark:bg-card py-4"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 lg:gap-8">
          <div className="shrink-0">
            <NavbarLogo />
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden lg:block">
              <UserActions />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="hidden md:block border-t border-border mt-2">
          <DesktopNav
            categories={categories}
            isCategoryMenuOpen={isCategoryMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
          />
        </div>
      </header>

      <div
        className="md:h-32"
        style={{ height: "calc(5rem + env(safe-area-inset-top))" }}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
        totalWishlistItems={totalWishlistItems}
        session={session}
      />
    </>
  );
}
