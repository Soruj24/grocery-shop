"use client";

import { motion } from "framer-motion";
import { Apple, PlayCircle, Smartphone, CheckCircle2 } from "lucide-react";
 
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";

export default function AppDownload() {
  const { t } = useLanguage();
  const benefits = [
    t('app_download_benefit_1'),
    t('app_download_benefit_2'),
    t('app_download_benefit_3'),
    t('app_download_benefit_4')
  ];

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-[#0F172A] dark:via-[#1E293B] dark:to-black rounded-[64px] relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 p-8 md:p-20">
            <div className="space-y-10">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full text-xs font-black uppercase tracking-[0.2em]"
                >
                  <Smartphone size={14} className="animate-bounce" />
                  {t('app_download_badge')}
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]"
                >
                  {t('app_download_title_1')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{t('app_download_title_2')}</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-400 font-medium leading-relaxed max-w-xl"
                >
                  {t('app_download_desc')}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 text-white/80 font-bold"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    {benefit}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-white/5 hover:bg-green-500 hover:text-white group"
                >
                  <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black opacity-60">{t('get_it_on')}</p>
                    <p className="text-lg">{t('google_play')}</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl hover:bg-white hover:text-black group"
                >
                  <Apple className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black opacity-60">{t('download_on')}</p>
                    <p className="text-lg">{t('app_store')}</p>
                  </div>
                </motion.button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative hidden lg:block"
            >
              <div className="relative w-[500px] h-[600px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-[100px] blur-3xl animate-pulse" />
                <Image
                  src="https://chaldn.com/_mpapi/static/1.0.0/web/images/home/phone-app-mockup.png" 
                  alt={t('app_mockup_alt')}
                  fill
                  sizes="500px"
                  className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
