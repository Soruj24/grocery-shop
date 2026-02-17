"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";
import { CheckCircle2, ShoppingBag, Truck, Users } from "lucide-react";

export default function AboutPage() {
 
  const features = [
    {
      icon: ShoppingBag,
      title: "Fresh Products",
      desc: "We source only the freshest produce and high-quality items for your family."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Get your groceries delivered to your doorstep within hours."
    },
    {
      icon: Users,
      title: "Customer First",
      desc: "Our dedicated support team is always here to help you with any queries."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120]">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image 
          src={getProductFallbackImage("about")} 
          alt="About Us" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <div className="relative z-10 text-center max-w-4xl px-4 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight"
          >
            We Are <span className="text-green-500">GrocerStore</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Delivering freshness and quality to your doorstep since 2020.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
              Our Mission is to Make <span className="text-green-600">Grocery Shopping</span> Easier.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe that everyone deserves access to fresh, high-quality food without the hassle. Our platform connects you with the best local suppliers and ensures that your groceries are delivered with care.
            </p>
            <div className="space-y-4">
              {[
                "100% Organic & Fresh Products",
                "Best Prices & Offers",
                "Secure Payment & Easy Returns"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[48px] overflow-hidden shadow-2xl"
          >
            <Image 
              src={getProductFallbackImage("vegetable")} 
              alt="Our Mission" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Why Choose Us?</h2>
            <p className="text-lg text-gray-500 font-medium">
              We are committed to providing you with the best shopping experience possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-[32px] hover:bg-green-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
