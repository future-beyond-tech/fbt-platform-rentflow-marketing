import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentFlow - The Future of Property Management | FBT",
  description: "World's first usage-based property management platform. Eliminate 35 hours of monthly admin work with zero-friction operations. Built for Indian PG owners, loved by enterprise portfolios.",
  keywords: ["property management", "PG management", "rent collection", "tenant management", "SaaS", "RentFlow", "Future Beyond Tech"],
  authors: [{ name: "Future Beyond Tech" }],
  openGraph: {
    title: "RentFlow - The Future of Property Management",
    description: "World's first usage-based property management platform. Zero friction. Infinite scale.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
