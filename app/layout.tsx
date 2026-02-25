import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "RentFlow — India's First Usage-Based OS for PG & Co-Living | FBT",
  description: siteConfig.description,
  keywords: ["PG management software India", "co-living software India", "property management platform India", "usage-based pricing SaaS", "RentFlow", "Future Beyond Tech"],
  authors: [{ name: "Future Beyond Tech" }],
  openGraph: {
    title: "RentFlow — India's First Usage-Based OS for PG & Co-Living",
    description: siteConfig.description,
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
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
