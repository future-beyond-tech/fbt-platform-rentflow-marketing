import type { Metadata } from "next";
import { ViralLandingPage } from "@/modules/marketing/waitlist/ViralLandingPage";

export const metadata: Metadata = {
  title: "RentFlow Waitlist — Usage Based PG Management SaaS",
  description:
    "Join India's first usage-based PG management platform. Get 50% lifetime discount for founding members.",
  openGraph: {
    title: "RentFlow Waitlist — Usage Based PG Management SaaS",
    description:
      "Join India's first usage-based PG management platform. Get 50% lifetime discount for founding members.",
  },
};

export default function WaitlistPage() {
  return <ViralLandingPage />;
}
