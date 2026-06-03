"use client";

import SupportHero from "@/components/shop/support/SupportHero";
import ContactInfoCards from "@/components/shop/support/ContactInfoCards";
import ContactForm from "@/components/shop/support/ContactForm";
import FaqSection from "@/components/shop/support/FaqSection";
import TrustBadges from "@/components/shop/support/TrustBadges";

export default function SupportPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SupportHero />
      <div className="grid lg:grid-cols-3 gap-8">
        <ContactInfoCards />
        <ContactForm />
      </div>
      <FaqSection />
      <TrustBadges />
    </div>
  );
}
