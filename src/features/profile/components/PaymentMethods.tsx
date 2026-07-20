"use client";

import { CreditCard, Plus, Trash2, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui";

export default function PaymentMethods() {
  const { t } = useLanguage();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 4582",
      expiry: "12/26",
      isDefault: true,
      color: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "**** **** **** 8954",
      expiry: "08/25",
      isDefault: false,
      color: "bg-gradient-to-br from-gray-800 to-black",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <CreditCard className="text-info" />
            {t('payment_methods_title')}
          </h2>
          <p className="text-muted-foreground mt-1">{t('payment_methods_desc')}</p>
        </div>
        
        <Button variant="info" leftIcon={<Plus size={20} />}>
          {t('add_new_card')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`relative p-8 rounded-2xl text-white shadow-xl overflow-hidden group ${card.color}`}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{t('card_type')}</p>
                  <h3 className="text-xl font-black italic tracking-wider">{card.type}</h3>
                </div>
                <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl">
                  <CreditCard size={24} />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-2xl font-mono tracking-[0.2em]">{card.number}</p>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t('expiry_date')}</p>
                    <p className="font-bold tracking-widest">{card.expiry}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {card.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                <ShieldCheck size={12} className="text-green-600" />
                {t('default_label')}
              </div>
            )}
          </div>
        ))}

        {/* Other methods */}
        <div className="p-8 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 text-center group hover:border-info/50 transition-all cursor-pointer">
          <div className="p-4 bg-muted rounded-2xl text-muted-foreground group-hover:bg-info-subtle group-hover:text-info transition-all">
            <Wallet size={32} />
          </div>
          <div>
            <h4 className="font-bold text-foreground">{t('add_bkash_nagad')}</h4>
            <p className="text-xs text-muted-foreground mt-1">{t('add_mobile_banking_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
