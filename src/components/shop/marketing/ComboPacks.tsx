"use client";

import { CheckCircle2, ShoppingCart, Zap, Timer, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";
import { motion } from "framer-motion";

interface Combo {
  _id: string;
  name: string;
  items: string[];
  price: number;
  saveAmount: number;
  tag: string;
  isActive: boolean;
}

export default function ComboPacks() {
  const { t, language } = useLanguage();
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch("/api/admin/combos");
        if (res.ok) {
          const data = await res.json();
          setCombos(data.filter((c: Combo) => c.isActive));
        }
      } catch (error) {
        console.error("Failed to fetch combos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombos();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (combos.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-black/20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Package size={14} className="animate-bounce" />
            <span>{t('combo_packs_badge')}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            {t('combo_packs_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{t('combo_packs_title_accent')}</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto"
          >
            {t('combo_packs_desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {combos.map((combo, idx) => (
            <motion.div
              key={combo._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] opacity-20 group-hover:opacity-100 blur transition duration-500" />
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                
                {/* Visual Side */}
                <div className="w-full md:w-1/2 relative">
                  {/* Main Image Composition */}
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full animate-pulse" />
                    <div className="absolute inset-4 grid grid-cols-2 gap-2 group-hover:rotate-3 transition-transform duration-500 ease-in-out">
                      {combo.items.slice(0, 4).map((item, i) => (
                        <div key={i} className="relative bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm overflow-hidden border border-gray-100 dark:border-white/5 group-hover:scale-105 transition-transform duration-500 delay-[50ms]">
                          <Image
                            src={getProductFallbackImage(item)}
                            alt={item}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30 rotate-12 z-10 uppercase tracking-wider">
                      Save {t('currency_symbol')}{combo.saveAmount}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 flex flex-col h-full text-center md:text-left">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest mb-3">
                      <Zap size={12} className="fill-current" />
                      {combo.tag}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                      {combo.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {combo.items.length} items included
                    </p>
                  </div>

                  <div className="flex-1 space-y-3 mb-8">
                    {combo.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="line-clamp-1 text-left">{item}</span>
                      </div>
                    ))}
                    {combo.items.length > 3 && (
                      <div className="text-xs font-bold text-gray-400 pl-6 text-left">
                        + {combo.items.length - 3} more items...
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-end justify-between md:justify-start gap-4 mb-4">
                       <div className="flex flex-col items-start">
                         <span className="text-xs font-bold text-gray-400 line-through">
                           {t('currency_symbol')}{(combo.price + combo.saveAmount).toLocaleString()}
                         </span>
                         <span className="text-3xl font-black text-purple-600 dark:text-purple-400">
                           {t('currency_symbol')}{combo.price.toLocaleString()}
                         </span>
                       </div>
                    </div>
                    
                    <Link
                      href="/products"
                      className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        {t('view_deal')}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
