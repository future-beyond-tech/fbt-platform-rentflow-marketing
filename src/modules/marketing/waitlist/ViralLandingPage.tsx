"use client";

import React from "react";
import { ViralHero } from "./components/ViralHero";
import { ViralFeaturesStrip } from "./components/ViralFeaturesStrip";
import { SocialProof } from "./components/SocialProof";
import { ProblemAgitation } from "./components/ProblemAgitation";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { InvestorSection } from "./components/InvestorSection";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export function ViralLandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <ViralHero />
      <ViralFeaturesStrip />
      <SocialProof />
      <ProblemAgitation />
      <HowItWorks />
      <Benefits />
      <InvestorSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
