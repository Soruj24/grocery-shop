"use client";

import { motion } from "framer-motion";
import { Star, Gift, History, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function LoyaltyPoints() {
  const { t, language } = useLanguage();
  // Mock data - in a real app, this would come from the user's session/API
  const points = 1250;
  const history = [
    { id: 1, action: "Order #1234", points: +150, date: "2024-02-10" },
    { id: 2, action: t('review_bonus'), points: +50, date: "2024-02-08" },
    { id: 3, action: t('discount_redeem'), points: -500, date: "2024-02-05" },
    { id: 4, action: "Order #1180", points: +200, date: "2024-01-25" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-green-600 to-emerald-700 p-8 md:p-12 rounded-[40px] text-white shadow-2xl shadow-green-600/20 relative overflow-hidden">
        {/* Background Sparkles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 opacity-80">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-black uppercase tracking-widest text-xs">{t('your_current_points')}</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black">{points.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</h2>
          <p className="text-green-100 font-medium">{t('points_earning_rule')}</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col items-center gap-2">
            <Gift className="w-6 h-6" />
            <span className="text-xs font-bold opacity-70">{t('gift_label')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-bold opacity-70">{t('level_up_label')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-gray-400" />
            <h3 className="text-xl font-black text-gray-800 dark:text-white">{t('point_history')}</h3>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 last:border-0">
                <div className="space-y-1">
                  <p className="font-black text-gray-800 dark:text-gray-200">{item.action}</p>
                  <p className="text-xs text-gray-400 font-bold">{item.date}</p>
                </div>
                <span className={`font-black ${item.points > 0 ? 'text-green-600' : 'text-rose-500'}`}>
                  {item.points > 0 ? `+${item.points.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}` : item.points.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-800 dark:text-white">{t('redeem_title')}</h3>
          <div className="space-y-4">
            {[
              { label: t('reward_50_off'), points: 500 },
              { label: t('reward_100_off'), points: 1000 },
              { label: t('reward_free_delivery'), points: 300 },
            ].map((reward, i) => (
              <button
                key={i}
                disabled={points < reward.points}
                className={`w-full p-6 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all ${
                  points >= reward.points
                    ? "border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 hover:border-green-500"
                    : "border-gray-100 dark:border-white/5 opacity-50 grayscale"
                }`}
              >
                <span className="font-black text-gray-800 dark:text-gray-200">{reward.label}</span>
                <span className="text-xs font-bold text-green-600">{reward.points.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}{t('points_suffix')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
