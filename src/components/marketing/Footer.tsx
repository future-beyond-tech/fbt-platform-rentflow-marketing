import Link from "next/link";
import { Building2 } from "lucide-react";
import { routes } from "@/config/routes";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "For Operators", href: routes.forOperators },
      { label: "Pricing", href: routes.pricing },
      { label: "Security & Compliance", href: routes.security },
      { label: "Case Studies", href: routes.caseStudies },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Investors", href: routes.forInvestors },
      { label: "Waitlist", href: routes.waitlist },
      { label: "Sign in", href: routes.waitlist },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          <div className="col-span-2">
            <Link
              href={routes.home}
              className="inline-flex items-center gap-2 text-white font-bold text-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-white">
                <Building2 className="h-4 w-4" />
              </span>
              RentFlow
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              The operating system for PG & co-living infrastructure. Usage-based, modular, built for India.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, index) => (
                  <li key={`${group.title}-${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} RentFlow by Future Beyond Tech. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
