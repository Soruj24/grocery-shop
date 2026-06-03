"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { useCountdown } from "@/hooks/useCountdown";

export interface DailyDealsBannerData {
  badge?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  productName?: string;
  image?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  endAt?: string;
}

export function useDailyDeals(data?: DailyDealsBannerData) {
  const { t } = useLanguage();
  const timeLeft = useCountdown(data?.endAt);
  const content = {
    badge: data?.badge || t("daily_deals_badge"),
    title: data?.title || t("daily_deals_title"),
    subtitle: data?.subtitle || t("daily_deals_subtitle"),
    desc: data?.desc || t("daily_deals_desc"),
    productName: data?.productName || t("daily_deals_product_name"),
    image: data?.image || "/apple.png",
    price: data?.price || t("price_80_tk"),
    originalPrice: data?.originalPrice || t("price_160_tk"),
    discount: data?.discount || t("percent_50"),
  };
  return { t, timeLeft, content };
}
