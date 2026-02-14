"use client";

import NewsletterHeader from "./Newsletter/NewsletterHeader";
import NewsletterForm from "./Newsletter/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden rounded-[60px] py-20 px-8 md:px-20 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-800" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10" />

      {/* Floating Background Circles */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
        <NewsletterHeader />
        <NewsletterForm />
      </div>
    </section>
  );
}
