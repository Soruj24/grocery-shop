import Link from "next/link";
import { ShoppingBasket, User, Search, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-black pb-20 md:pb-0 transition-colors duration-300"
      style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}
