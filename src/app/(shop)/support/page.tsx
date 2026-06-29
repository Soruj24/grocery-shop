import SupportHero from "@/features/support/components/SupportHero";
import ContactInfoCards from "@/features/support/components/ContactInfoCards";
import ContactForm from "@/features/support/components/ContactForm";
import FaqSection from "@/features/support/components/FaqSection";
import TrustBadges from "@/features/support/components/TrustBadges";

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
