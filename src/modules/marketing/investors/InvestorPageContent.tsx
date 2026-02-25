"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { InvestorForm } from "./InvestorForm";
import Link from "next/link";

const timelineSteps = [
  { label: "Product in development", done: true },
  { label: "Architecture complete", done: true },
  { label: "Marketing live", done: true },
  { label: "Waitlist open", done: true },
  { label: "Early operator conversations ongoing", done: true },
];

const marketBlocks = [
  { value: "50,000+", label: "PGs in India" },
  { value: "₹45,000+ Cr", label: "Estimated rental economy" },
  { value: "90%", label: "Digital adoption gap (fragmented tools)" },
  { value: "Fragmented", label: "No dominant operating layer" },
];

const faqItems = [
  {
    q: "What is PG management software?",
    a: "PG management software helps paying guest and co-living operators manage properties, tenants, rent collection, utility billing, and compliance from one platform. It replaces fragmented tools and spreadsheets with a unified system.",
  },
  {
    q: "How is RentFlow different from other property tools?",
    a: "RentFlow is built as an operating layer that connects rent, utilities, compliance, and communication—not another point solution. Usage-based pricing and multi-tenant architecture are designed for scale from one property to thousands.",
  },
  {
    q: "Is RentFlow live?",
    a: "Product is in development. Architecture is complete, marketing is live, and the waitlist is open. We are in early operator conversations.",
  },
  {
    q: "What stage is RentFlow currently in?",
    a: "Pre-launch. We are building the platform, running the waitlist, and speaking with early operators and investors. We are transparent about our stage.",
  },
  {
    q: "Who can invest in RentFlow?",
    a: "We welcome conversations with angel investors, VCs, real estate investors, and strategic partners who are aligned with long-term infrastructure and digitalization of India's rental economy.",
  },
];

function useFadeIn() {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" } as const,
    transition: { duration: 0.4 },
  };
}

export function InvestorPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fade = useFadeIn();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="pt-16 sm:pt-20 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100" aria-labelledby="investor-hero-heading">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            id="investor-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building the Operating System for India&apos;s Rental Infrastructure
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            RentFlow is a usage-based infrastructure platform designed to unify fragmented PG and co-living operations into one scalable system.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="mailto:investors@rentflow.in"
              className="inline-flex items-center gap-2 px-6 py-4 min-h-[48px] rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              Schedule a Conversation
              <ArrowRight className="w-5 h-5" aria-hidden />
            </a>
            <a
              href="#investor-form"
              className="inline-flex items-center gap-2 px-6 py-4 min-h-[48px] rounded-xl border-2 border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
            >
              Request Detailed Deck
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — Where We Are Today */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="stage-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="stage-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8" {...fade}>
            Where We Are Today
          </motion.h2>
          <motion.ul className="space-y-4" {...fade} role="list">
            {timelineSteps.map((step, i) => (
              <li key={step.label} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" aria-hidden />
                </span>
                <span className="text-slate-700">{step.label}</span>
              </li>
            ))}
          </motion.ul>
          <motion.p className="mt-6 text-slate-600 text-sm" {...fade}>
            Honest. Controlled. Mature.
          </motion.p>
        </div>
      </section>

      {/* Section 2 — Fragmented Infrastructure Problem */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="problem-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="problem-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6" {...fade}>
            A Fragmented Infrastructure Problem
          </motion.h2>
          <motion.p className="text-slate-700 leading-relaxed mb-4" {...fade}>
            Operators use electricity billing apps, separate accounting software, WhatsApp for reminders, and Excel for reconciliation. There is no unified real-time visibility. Subscription costs stack; manual cross-verification remains. This is market fragmentation—not absence of software. PG management software in India and co-living software exist, but as point solutions. Property management platform and rental operations software are often siloed. RentFlow is the layer that connects the system.
          </motion.p>
        </div>
      </section>

      {/* Section 3 — Why Now */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="why-now-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="why-now-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6" {...fade}>
            Why Now
          </motion.h2>
          <motion.p className="text-slate-700 leading-relaxed mb-4" {...fade}>
            The UPI revolution proved India can leapfrog legacy systems. India&apos;s digital transformation has made payments and identity infrastructure mainstream. The rise of rental investors and institutional interest in co-living and student housing has increased demand for visibility and scale. Compliance complexity—GST, audit trails, tenant agreements—is pushing operators toward digitization. Asset digitization is a clear trend. Rental infrastructure is the next digital layer.
          </motion.p>
        </div>
      </section>

      {/* Section 4 — Security & Architecture */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="security-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="security-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6" {...fade}>
            Security & Architecture
          </motion.h2>
          <motion.p className="text-slate-700 leading-relaxed mb-6" {...fade}>
            RentFlow is built as a platform, not a single product. At its core is a proprietary identity and security layer that gives us control, compliance readiness, and the ability to scale across products without depending on third-party identity vendors. This foundation enables true single sign-on, role-based access, and audit-ready trails—positioning us for enterprise and institutional customers from day one.
          </motion.p>
          <motion.ul className="space-y-3 text-slate-700 mb-8" {...fade} role="list">
            <li><strong>Proprietary identity layer</strong> — Centralized authentication and single sign-on across current and future products.</li>
            <li><strong>Enterprise-ready security</strong> — Role-based and scope-based access, multi-factor authentication, and multi-device session control.</li>
            <li><strong>Compliance-ready</strong> — Full audit trails and controls designed for SOC 2 and institutional requirements.</li>
            <li><strong>Vendor-independent</strong> — No lock-in to external identity providers; infrastructure-based economics, not per-user identity fees.</li>
            <li><strong>Scalable by design</strong> — Stateless validation at the gateway, multi-tenant isolation, built for one property to thousands.</li>
          </motion.ul>
          <motion.div className="rounded-xl border border-slate-200 bg-white p-6" {...fade}>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most property and rental tools rely on third-party identity and bolt-on security. We own the identity layer. That means we control the roadmap for SSO, compliance, and multi-product expansion—without per-seat identity costs or vendor negotiations. For operators scaling to dozens of properties and for institutional investors who need auditability, that&apos;s a structural advantage.
            </p>
            <p className="text-slate-600 text-sm italic">
              RentFlow is the first product on a platform built to power multiple offerings—from PG and co-living today to broader rental and asset operations tomorrow. The same identity, security, and data layer that runs RentFlow is designed to support future products without re-architecting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 4b — Long-Term Moat & Scalability */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="moat-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="moat-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6" {...fade}>
            Why We&apos;re Built to Last
          </motion.h2>
          <motion.ul className="space-y-4 text-slate-700" {...fade} role="list">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" aria-hidden />
              </span>
              <span><strong>Proprietary identity and security</strong> — Reduces dependency on external vendors and supports enterprise sales and compliance from day one.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" aria-hidden />
              </span>
              <span><strong>Infrastructure-based cost model</strong> — Scales with usage, not per-seat identity or feature fees; better unit economics as we grow.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" aria-hidden />
              </span>
              <span><strong>Platform architecture</strong> — New products and segments can launch on the same core security and data layer without rebuilding.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" aria-hidden />
              </span>
              <span><strong>Single sign-on and centralized identity</strong> — Increase stickiness and enable multi-product expansion under one account.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" aria-hidden />
              </span>
              <span><strong>Audit trails and enterprise controls</strong> — Position us for institutional customers and SOC 2–ready deployments.</span>
            </li>
          </motion.ul>
        </div>
      </section>

      {/* Section 5 — Market Opportunity */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="opportunity-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="opportunity-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8" {...fade}>
            Market Opportunity
          </motion.h2>
          <motion.div className="grid grid-cols-2 gap-4 mb-8" {...fade}>
            {marketBlocks.map((block) => (
              <div key={block.label} className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-white">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{block.value}</div>
                <div className="text-sm text-slate-600 mt-1">{block.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.p className="text-slate-700" {...fade}>
            Market remains fragmented with no dominant operating layer.
          </motion.p>
        </div>
      </section>

      {/* Section 6 — Founder Note */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white" aria-labelledby="founder-heading">
        <div className="max-w-3xl mx-auto">
          <motion.div className="flex items-start gap-4" {...fade}>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden>
              <Quote className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h2 id="founder-heading" className="text-xl sm:text-2xl font-bold mb-4">A Founder&apos;s Perspective</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                I spend a lot of time observing how PG and co-living operators actually work. The inefficiencies aren&apos;t from a lack of effort—they&apos;re from a lack of integration. Electricity in one app, accounting in another, reminders in WhatsApp. We&apos;re building with an infrastructure mindset: one system that connects the pieces, scales with the operator, and respects the complexity of Indian rental operations. The mission is long-term—digitalizing the rental ecosystem so that owners, investors, and tenants all benefit from a single source of truth. No ego, no hype. Just a commitment to build something that lasts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7 — Investor Form */}
      <section id="investor-form" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="form-heading">
        <div className="max-w-xl mx-auto">
          <motion.h2 id="form-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center" {...fade}>
            Request Investor Brief
          </motion.h2>
          <motion.div {...fade}>
            <InvestorForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <motion.h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8" {...fade}>
            Frequently asked questions
          </motion.h2>
          <ul className="space-y-3" role="list">
            {faqItems.map((item, i) => (
              <motion.li key={item.q} {...fade}>
                <article className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left min-h-[48px] hover:bg-slate-50 transition-colors"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-ans-${i}`}
                    id={`faq-q-${i}`}
                  >
                    <span className="font-semibold text-slate-900">{item.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div id={`faq-ans-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="px-4 pb-4 pt-0 text-slate-700 border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer link */}
      <footer className="py-10 px-4 border-t border-slate-200 text-center">
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to RentFlow
        </Link>
      </footer>
    </main>
  );
}
