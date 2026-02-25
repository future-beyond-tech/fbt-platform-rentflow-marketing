import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  getOrganizationSchema,
  getSoftwareApplicationSchema,
  getFounderSchema,
} from "@/modules/marketing/landing/structuredData";
import { InvestorPageContent } from "@/modules/marketing/investors/InvestorPageContent";

const baseUrl = siteConfig.url.replace(/\/$/, "");
const canonicalUrl = `${baseUrl}/investors`;
const ogImageUrl = `${baseUrl}${siteConfig.ogImage.startsWith("/") ? siteConfig.ogImage : `/${siteConfig.ogImage}`}`;

const faqForSchema = [
  {
    question: "What is PG management software?",
    answer:
      "PG management software helps paying guest and co-living operators manage properties, tenants, rent collection, utility billing, and compliance from one platform. It replaces fragmented tools and spreadsheets with a unified system.",
  },
  {
    question: "How is RentFlow different from other property tools?",
    answer:
      "RentFlow is built as an operating layer that connects rent, utilities, compliance, and communication—not another point solution. Usage-based pricing and multi-tenant architecture are designed for scale from one property to thousands.",
  },
  {
    question: "Is RentFlow live?",
    answer:
      "Product is in development. Architecture is complete, marketing is live, and the waitlist is open. We are in early operator conversations.",
  },
  {
    question: "What stage is RentFlow currently in?",
    answer:
      "Pre-launch. We are building the platform, running the waitlist, and speaking with early operators and investors. We are transparent about our stage.",
  },
  {
    question: "Who can invest in RentFlow?",
    answer:
      "We welcome conversations with angel investors, VCs, real estate investors, and strategic partners who are aligned with long-term infrastructure and digitalization of India's rental economy.",
  },
];

function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqForSchema.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const metadata: Metadata = {
  title: "RentFlow Investor Brief | Digital Rental Infrastructure India",
  description:
    "RentFlow is building India's first usage-based operating system for PG and co-living infrastructure. Explore our investor brief and digital rental thesis.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "RentFlow Investor Brief | Digital Rental Infrastructure India",
    description:
      "RentFlow is building India's first usage-based operating system for PG and co-living infrastructure. Explore our investor brief and digital rental thesis.",
    url: canonicalUrl,
    siteName: siteConfig.name,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "RentFlow Investor Brief" }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentFlow Investor Brief | Digital Rental Infrastructure India",
    description:
      "RentFlow is building India's first usage-based operating system for PG and co-living infrastructure. Explore our investor brief and digital rental thesis.",
    images: [ogImageUrl],
  },
};

export default function InvestorsPage() {
  const structuredData = [
    getOrganizationSchema(baseUrl),
    getSoftwareApplicationSchema(baseUrl),
    getFounderSchema(baseUrl),
    getFAQSchema(),
  ];

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <InvestorPageContent />
    </>
  );
}
