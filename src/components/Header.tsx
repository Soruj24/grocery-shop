"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Menu, Search } from "lucide-react";
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-2"
            : "bg-white dark:bg-gray-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <div className="shrink-0">
            <NavbarLogo />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden lg:block">
              <UserActions />
            </div>
            
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories Bar (Desktop Only) */}
        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800 mt-2">
          <DesktopNav
            categories={categories}
            isCategoryMenuOpen={isCategoryMenuOpen}
            setIsCategoryMenuOpen={setIsCategoryMenuOpen}
          />
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-32" />

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
