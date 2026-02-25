import { siteConfig } from "@/config/site";

export function getOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    sameAs: [
      "https://www.linkedin.com/company/future-beyond-tech",
      "https://twitter.com/rentflow_in",
    ],
  };
}

export function getSoftwareApplicationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: baseUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function getFounderSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "RentFlow Founders",
    jobTitle: "Founders",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    description: "Building India's first usage-based operating system for PG and co-living infrastructure.",
  };
}

export function getAllStructuredData(baseUrl: string) {
  return [
    getOrganizationSchema(baseUrl),
    getSoftwareApplicationSchema(baseUrl),
    getFounderSchema(baseUrl),
  ];
}
