"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, MessageCircle, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";

const shareText = "India's rental infrastructure is finally being digitalized. #DigitalizeRentalIndia";
const shareUrl = typeof window !== "undefined" ? window.location.href : siteConfig.url;

function buildShareLinks() {
  if (typeof window === "undefined") return { linkedin: "#", twitter: "#", whatsapp: "#" };
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };
}

export default function DigitalizationMovementSection() {
  const shareLinks = buildShareLinks();

  const handleShare = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  }, []);

  return (
    <section
      className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden"
      aria-labelledby="movement-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Section Title (SEO) */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
            India&apos;s Rental Infrastructure Digitalization Movement
          </p>
          <h2
            id="movement-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
          >
            Digitalizing India&apos;s PG &amp; Co-Living Infrastructure
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            A property management platform for India—built for PG management software and co-living software needs. Usage-based pricing SaaS that scales with your portfolio.
          </p>
        </motion.header>

        {/* 2. The Reality Behind the Numbers — fragmentation narrative */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-14 sm:mb-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            The reality behind the numbers
          </h3>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-5">
            <p>
              It&apos;s past midnight. A PG owner is reconciling payments—manually matching bank entries to tenant names. Multiple browser tabs are open: a separate electricity billing app, accounting software, WhatsApp for reminders, Excel for occupancy. No unified dashboard. Fragmented visibility. Every month, manual cross-verification across tools. Subscription costs stack up—electricity app fees, rental accounting software, SMS costs—plus the time cost of switching between apps.
            </p>
            <p>
              Billing tools exist. Electricity and utility billing software exist. Accounting and property management tools exist. Messaging works. But they don&apos;t talk to each other. Operators running PG and co-living portfolios in India aren&apos;t short on software. They&apos;re short on one place where rent, utilities, occupancy, and communication sit together.
            </p>
            <p className="font-medium text-slate-900">
              These tools solve parts of the problem. But none of them connect the system.
            </p>
            <p>
              What PG operators don&apos;t lack is software. They lack integration. A co-living management platform or PG management software in India that only does invoicing still leaves electricity in another app, accounting in another, and reminders in WhatsApp. The result is inefficiency—not absence of tools.
            </p>
            <p className="font-medium text-slate-900">
              RentFlow is not another tool. It is the layer that connects the system.
            </p>
          </div>
        </motion.article>

        {/* 3. Data-Driven Opportunity — fragmentation / consolidation framing */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-14 sm:mb-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            The opportunity
          </h3>
          <ul className="space-y-3 text-slate-700" role="list">
            <li><strong className="text-slate-900">10M+</strong> rental beds in India&apos;s PG and co-living segment</li>
            <li><strong className="text-slate-900">₹45,000+ Cr</strong> rental economy running on fragmented property management and utility billing tools</li>
            <li><strong className="text-slate-900">90%</strong> of operators juggle multiple subscriptions—electricity apps, accounting software, spreadsheets, messaging—with no single unified visibility</li>
            <li><strong className="text-slate-900">Clear consolidation play:</strong> one operating layer for rent, utilities, compliance, and communication</li>
          </ul>
        </motion.article>

        {/* 4. Why Now */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-14 sm:mb-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Why now?
          </h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The UPI revolution proved India can leapfrog legacy systems. Fintech transformation made digital payments normal. Co-living and organized rental assets are growing. Regulatory pressure—GST, compliance, audit trails—is pushing operators toward digitization. Investors are entering the rental space and expect visibility and scale.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-8">
            Rental infrastructure is the next digital frontier.
          </p>
        </motion.article>

        {/* 5. Founder Note */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-14 sm:mb-20"
        >
          <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-8 sm:p-10 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0" aria-hidden>
                <Quote className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4">A note from the founders</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We&apos;re building RentFlow because India&apos;s PG and co-living operators deserve infrastructure—not another app that doesn&apos;t fit. We&apos;re early-stage. We&apos;re transparent about that. Our mission is simple: digitalize rental operations so owners can scale, investors can trust the numbers, and tenants get a better experience. No fake testimonials. No inflated claims. Just a commitment to build the operating system this market needs.
                </p>
                <p className="text-slate-400 text-sm font-medium">
                  #DigitalizeRentalIndia
                </p>
              </div>
            </div>
          </div>
        </motion.article>

        {/* 6. Share this movement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Share this movement</h3>
          <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Help more operators and investors discover rental infrastructure digitization.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleShare(shareLinks.linkedin)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" aria-hidden />
              LinkedIn
            </button>
            <button
              type="button"
              onClick={() => handleShare(shareLinks.twitter)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" aria-hidden />
              Twitter
            </button>
            <button
              type="button"
              onClick={() => handleShare(shareLinks.whatsapp)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              WhatsApp
            </button>
          </div>
        </motion.div>

        {/* Internal links for SEO */}
        <nav className="mt-12 pt-8 border-t border-slate-200 text-center" aria-label="Related links">
          <p className="text-slate-600 text-sm mb-3">Explore RentFlow</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#features" className="text-blue-600 font-semibold hover:underline">Product features</a>
            <a href="#pricing" className="text-blue-600 font-semibold hover:underline">Pricing</a>
            <a href="/waitlist" className="text-blue-600 font-semibold hover:underline">Join the waitlist</a>
          </div>
        </nav>
      </div>
    </section>
  );
}
