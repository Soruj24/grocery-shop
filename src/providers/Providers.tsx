"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useState } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { ToastProvider } from "@/components/ui/system/Toast";

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
                        <ToastProvider>
                          {children}
                          <WhatsAppButton />
                        </ToastProvider>
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
