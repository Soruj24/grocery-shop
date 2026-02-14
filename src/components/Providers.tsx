"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedContext";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <CartProvider>{children}</CartProvider>
              </WishlistProvider>
            </RecentlyViewedProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
