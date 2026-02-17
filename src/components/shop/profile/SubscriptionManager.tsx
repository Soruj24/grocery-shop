"use client";

import { Calendar, Truck, ShieldCheck, ChevronRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function SubscriptionManager() {
  const { t, language } = useLanguage();
  const nextDelivery = [
    { id: 1, name: t('sub_item_milk'), qty: t('unit_2_liter') },
    { id: 2, name: t('sub_item_eggs'), qty: t('unit_1_dozen') },
    { id: 3, name: t('sub_item_veg_box'), qty: t('unit_1_pc') },
  ];

  return (
    <div className="space-y-10">
      {/* Active Subscription Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-700 rounded-[40px] p-10 text-white shadow-2xl shadow-green-500/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-black uppercase tracking-widest text-xs text-green-100">{t('active_subscription')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black">{t('weekly_grocery')}</h2>
          
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-bold text-green-100">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span>{t('every_tuesday')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-300 rounded-full" />
              <span>{t('time_8_10')}</span>
            </div>
          </div>
        </div>

        <button className="absolute top-10 right-10 bg-white text-green-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-green-50 transition-colors shadow-xl">
          {t('manage_btn')}
        </button>
        
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Next Delivery Preview */}
      <div className="bg-white dark:bg-gray-900 rounded-[40px] p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-green-600" />
          {t('next_delivery_items')}
        </h3>
        
        <div className="space-y-4">
          {nextDelivery.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl group hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <span className="font-bold text-gray-700 dark:text-gray-200">{item.name}</span>
              </div>
              <span className="text-sm font-black text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-700 px-3 py-1 rounded-lg">
                {item.qty}
              </span>
            </div>
          ))}
          
          <div className="mt-8 pt-8 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="font-black text-gray-800 dark:text-white">{t('total_estimated_bill')}</span>
            <span className="font-black text-green-600 text-xl">{t('currency_symbol')}{(850).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-green-50 dark:bg-green-900/10 rounded-[40px] p-10">
        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8">{t('subscription_benefits')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Truck, title: t('sub_benefit_free_delivery'), desc: t('sub_benefit_free_delivery_desc') },
            { icon: ShieldCheck, title: t('sub_benefit_best_quality'), desc: t('sub_benefit_best_quality_desc') },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-green-900/30">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4 text-green-600">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
