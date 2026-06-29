"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/providers/CartContext";
import { WishlistProvider } from "@/providers/WishlistContext";
import { RecentlyViewedProvider } from "@/providers/RecentlyViewedContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import { NotificationProvider } from "@/providers/NotificationContext";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useState } from "react";
import { SettingsProvider } from "@/providers/SettingsContext";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

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
              <SettingsProvider>
                <NotificationProvider>
                  <RecentlyViewedProvider>
                    <WishlistProvider>
                      <CartProvider>
                        {children}
                        <WhatsAppButton />
                      </CartProvider>
                    </WishlistProvider>
                  </RecentlyViewedProvider>
                </NotificationProvider>
              </SettingsProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
