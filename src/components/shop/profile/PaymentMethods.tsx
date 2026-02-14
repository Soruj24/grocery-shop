"use client";

import { CreditCard, Plus, Trash2, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PaymentMethods() {
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
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <CreditCard className="text-blue-600" />
            পেমেন্ট পদ্ধতি
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">আপনার সেভ করা কার্ড এবং পেমেন্ট মেথড</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
          <Plus size={20} />
          নতুন কার্ড
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`relative p-8 rounded-[32px] text-white shadow-2xl overflow-hidden group ${card.color}`}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Card Type</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Expiry Date</p>
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
                Default
              </div>
            )}
          </div>
        ))}

        {/* Other methods */}
        <div className="p-8 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 text-center group hover:border-blue-500/50 transition-all cursor-pointer">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
            <Wallet size={32} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">বিকাশ বা নগদ যোগ করুন</h4>
            <p className="text-xs text-gray-500 mt-1">আপনার মোবাইল ব্যাংকিং অ্যাকাউন্ট সেভ করুন</p>
          </div>
        </div>
      </div>
    </div>
  );
}
