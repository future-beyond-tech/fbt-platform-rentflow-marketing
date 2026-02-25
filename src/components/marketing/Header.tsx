"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

const navItems = [
  { label: "For Operators", href: routes.forOperators },
  { label: "Investors", href: routes.forInvestors },
  { label: "Pricing", href: routes.pricing },
  { label: "Security & Compliance", href: routes.security },
  { label: "Case Studies", href: routes.caseStudies },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href={routes.home}
            className="flex items-center gap-2 text-slate-900 font-bold text-xl"
            aria-label="RentFlow home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Building2 className="h-5 w-5" />
            </span>
            RentFlow
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button href={routes.waitlist} variant="ghost" size="sm">
              Sign in
            </Button>
            <Button href="/#demo" variant="primary" size="sm">
              Book a 15-min walkthrough
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                href={routes.waitlist}
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Button>
              <Button href="/#demo" variant="primary" size="md" className="w-full">
                Book a 15-min walkthrough
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
