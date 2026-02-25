export const siteConfig = {
  name: "RentFlow",
  description:
    "India's first usage-based operating system for PG & co-living infrastructure. Automate 35+ admin hours, recover revenue leakage, scale from 1 bed to 1,000 properties.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rentflow.in",
  ogImage: "/og.png",
  links: {
    main: "/",
    waitlist: "/waitlist",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
  },
} as const;
