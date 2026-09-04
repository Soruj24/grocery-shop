import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import { PageFade } from "@/components/ui";

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
      <a href="#shop-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg">
        Skip to content
      </a>
      <Header />

      <main id="shop-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <PageFade>{children}</PageFade>
      </main>

      <MobileBottomNav />

      <Footer />
    </div>
  );
}
