export interface ViralFeature {
  title: string;
  description: string;
  icon: string;
}

export interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialProofItem {
  stat: string;
  label: string;
}

export interface WaitlistFormState {
  email: string;
  fullName?: string;
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export interface WaitlistSuccessData {
  id: string;
  position: number;
  referralCode: string;
  referralLink: string;
  message: string;
  alreadyRegistered?: boolean;
}
