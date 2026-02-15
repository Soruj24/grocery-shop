"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { NotificationProvider } from "@/components/NotificationContext";
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
    <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageProvider>
              <NotificationProvider>
                <RecentlyViewedProvider>
                  <WishlistProvider>
                    <CartProvider>{children}</CartProvider>
                  </WishlistProvider>
                </RecentlyViewedProvider>
              </NotificationProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
