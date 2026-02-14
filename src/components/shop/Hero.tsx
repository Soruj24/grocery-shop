"use client";

import HeroBackground from "./Hero/HeroBackground";
import HeroStats from "./Hero/HeroStats";
import HeroContent from "./Hero/HeroContent";

export default function Hero() {
  return (
    <section className="relative h-[750px] rounded-[60px] overflow-hidden group">
      <HeroBackground />
      <HeroStats />
      <HeroContent />
    </section>
  );
}
