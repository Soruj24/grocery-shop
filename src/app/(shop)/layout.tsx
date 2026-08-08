import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-background transition-colors duration-200"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {children}
      </main>

      <MobileBottomNav />

      <Footer />
    </div>
  );
}
