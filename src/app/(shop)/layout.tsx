import Link from "next/link";
import { ShoppingBasket, User, Search, ShoppingCart } from "lucide-react";
import AIChatAssistant from "@/components/AIChatAssistant";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { ShopProviders } from "@/components/shop/ShopProviders";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await dbConnect();
  const allProducts = await Product.find({ isActive: true }).lean();

  return (
    <ShopProviders allProducts={JSON.parse(JSON.stringify(allProducts))}>
      <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 md:pb-0 transition-colors duration-300">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <AIChatAssistant />

        {/* Mobile Bottom Nav */}
        <MobileBottomNav />

        {/* Footer */}
        <Footer />
      </div>
    </ShopProviders>
  );
}
