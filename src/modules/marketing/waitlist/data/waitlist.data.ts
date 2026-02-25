import type { ViralFeature, PainPoint, HowItWorksStep, Benefit, FAQItem, SocialProofItem } from "../types/waitlist.types";

export const viralFeatures: ViralFeature[] = [
  { title: "Usage-Based Pricing", description: "Pay only for transactions. No fixed fees.", icon: "TrendingUp" },
  { title: "50% Founding Member Discount", description: "Lock in lifetime savings when we launch.", icon: "Tag" },
  { title: "Early Access", description: "Be first to shape the product roadmap.", icon: "Rocket" },
];

export const painPoints: PainPoint[] = [
  { title: "Fixed monthly fees burn cash", description: "Pay ₹10K+ even when occupancy is low.", icon: "AlertCircle" },
  { title: "Manual rent chasing", description: "Hours spent on WhatsApp and calls.", icon: "Clock" },
  { title: "Excel chaos", description: "Utility splits and GST on spreadsheets.", icon: "FileSpreadsheet" },
];

export const howItWorksSteps: HowItWorksStep[] = [
  { step: "01", title: "Join the waitlist", description: "Enter your email. No credit card required." },
  { step: "02", title: "Get early access", description: "We'll invite you to the founding member program." },
  { step: "03", title: "Lock in 50% off", description: "Lifetime discount for our first 500 members." },
];

export const benefits: Benefit[] = [
  { title: "Zero upfront cost", description: "Start free. Scale with usage.", icon: "Zap" },
  { title: "Auto invoicing & UPI", description: "Rent collection on autopilot.", icon: "Wallet" },
  { title: "Real-time analytics", description: "Portfolio P&L at a glance.", icon: "BarChart3" },
];

export const faqData: FAQItem[] = [
  { question: "When will RentFlow launch?", answer: "We're targeting a private beta in Q3 2026. Waitlist members get first access." },
  { question: "What is usage-based pricing?", answer: "You pay only for transactions (e.g. rent collected), not per property or seat. Low occupancy = lower cost." },
  { question: "Is the 50% discount really lifetime?", answer: "Yes. Founding members who join from the waitlist lock in 50% off our standard usage fees for life." },
];

export const socialProof: SocialProofItem[] = [
  { stat: "500+", label: "PGs on waitlist" },
  { stat: "50,000+", label: "Beds in pipeline" },
  { stat: "₹0", label: "To join" },
];

export const LAUNCH_DATE = "2026-07-01T00:00:00Z";

/** Founding spots remaining — drives scarcity */
export const FOUNDING_SPOTS_TOTAL = 500;
export const FOUNDING_SPOTS_CLAIMED = 347;

export const foundingBenefits: { title: string; description: string }[] = [
  { title: "50% lifetime discount", description: "Lock in half off usage fees forever." },
  { title: "Feature voting rights", description: "Shape the product roadmap." },
  { title: "Direct founder access", description: "Priority support and input." },
  { title: "Early AI automation access", description: "First to new automation features." },
];
