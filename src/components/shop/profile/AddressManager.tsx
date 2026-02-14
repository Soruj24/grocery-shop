"use client";

import { MapPin, Plus, Trash2, Edit2, Home, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "House 12, Road 5, Dhanmondi, Dhaka",
      isDefault: true,
      icon: Home,
    },
    {
      id: 2,
      type: "Office",
      address: "Level 4, Software Park, Karwan Bazar, Dhaka",
      isDefault: false,
      icon: Briefcase,
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <MapPin className="text-green-600" />
            আমার ঠিকানাসমূহ
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">আপনার ডেলিভারি ঠিকানাগুলো ম্যানেজ করুন</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all">
          <Plus size={20} />
          নতুন ঠিকানা
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => {
          const Icon = addr.icon;
          return (
            <div 
              key={addr.id}
              className={`p-6 rounded-[32px] border-2 transition-all ${
                addr.isDefault 
                  ? "bg-green-500/5 border-green-500/20 shadow-lg shadow-green-500/5" 
                  : "bg-white dark:bg-white/5 border-gray-100 dark:border-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${
                  addr.isDefault ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-500"
                }`}>
                  <Icon size={20} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit2 size={18} />
                  </button>
                  {!addr.isDefault && (
                    <button className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-gray-900 dark:text-white">{addr.type}</h3>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {addr.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
