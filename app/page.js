"use client";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FinalCTASection from "../components/FinalCTASection";

export default function Home() {
  return (
    <div className="overflow-x-hidden scroll-smooth font-sans">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FinalCTASection />
    </div>
  );
}
