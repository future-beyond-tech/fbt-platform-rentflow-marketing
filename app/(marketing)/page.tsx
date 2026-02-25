import type { Metadata } from "next";
import HomePage from "@/modules/marketing/home/HomePage";
import { siteConfig } from "@/config/site";
import { getAllStructuredData } from "@/modules/marketing/landing/structuredData";

const canonicalUrl = siteConfig.url.replace(/\/$/, "") + "/";
const ogImageUrl = canonicalUrl + siteConfig.ogImage.replace(/^\//, "");

export const metadata: Metadata = {
  title: "RentFlow — India's First Usage-Based OS for PG & Co-Living | FBT",
  description:
    "PG management software India & co-living software. Usage-based property management platform. Digitalize rental infrastructure—automate 35+ admin hours, recover revenue leakage.",
  keywords: [
    "PG management software India",
    "co-living software India",
    "property management platform India",
    "usage-based pricing SaaS",
    "rental infrastructure digitization",
    "RentFlow",
    "Future Beyond Tech",
  ],
  authors: [{ name: "Future Beyond Tech" }],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "RentFlow — India's First Usage-Based OS for PG & Co-Living",
    description:
      "PG management software India & co-living software. Usage-based property management platform. Digitalize rental infrastructure.",
    url: canonicalUrl,
    siteName: siteConfig.name,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "RentFlow - India's rental infrastructure operating system" }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentFlow — India's First Usage-Based OS for PG & Co-Living",
    description:
      "PG management software India & co-living software. Usage-based property management platform. Digitalize rental infrastructure.",
    images: [ogImageUrl],
  },
};

export default function MarketingPage() {
  const structuredData = getAllStructuredData(canonicalUrl);

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <HomePage />
    </>
  );
}
