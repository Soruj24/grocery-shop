import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMRAN SHOP | সেরা গ্রোসারি অনলাইন শপ",
  description: "EMRAN SHOP থেকে কিনুন তাজা ফল, শাকসবজি এবং নিত্যপ্রয়োজনীয় সকল গ্রোসারি পণ্য। দ্রুত ডেলিভারি এবং সেরা মানের নিশ্চয়তা।",
  keywords: ["grocery shop", "online grocery bangladesh", "fresh vegetables", "organic fruits", "emran shop"],
  authors: [{ name: "Emran" }],
  openGraph: {
    title: "EMRAN SHOP | সেরা গ্রোসারি অনলাইন শপ",
    description: "তাজা এবং মানসম্মত গ্রোসারি পণ্য কিনুন সবচেয়ে কম দামে।",
    url: "https://emranshop.com",
    siteName: "EMRAN SHOP",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMRAN SHOP | সেরা গ্রোসারি অনলাইন শপ",
    description: "তাজা এবং মানসম্মত গ্রোসারি পণ্য কিনুন সবচেয়ে কম দামে।",
    images: ["/twitter-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
