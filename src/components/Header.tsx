"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import TopBar from "./shop/Header/TopBar";
import SearchBar from "./shop/Header/SearchBar";
import UserActions from "./shop/Header/UserActions";
import NavbarLogo from "./shop/Header/NavbarLogo";
import DesktopNav from "./shop/Header/DesktopNav";
import MobileDrawer from "./shop/Header/MobileDrawer";
import MobileSearch from "./shop/Header/MobileSearch";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: session } = useSession();
  const { totalWishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch categories for the navbar
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-2xl border-b border-gray-100/50 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-2"
            : "bg-white dark:bg-black py-4 lg:py-5"
        }`}
      >
        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 lg:gap-12">
          {/* Menu & Logo & Location */}
          <div className="flex items-center gap-2 lg:gap-8 min-w-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 lg:hidden text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="shrink-0 scale-90 sm:scale-100 origin-left">
              <NavbarLogo />
            </div>
          </div>

          <SearchBar />

          <div className="shrink-0">
            <UserActions />
          </div>
        </div>

        <DesktopNav
          categories={categories}
          isCategoryMenuOpen={isCategoryMenuOpen}
          setIsCategoryMenuOpen={setIsCategoryMenuOpen}
        />

        <MobileSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

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
