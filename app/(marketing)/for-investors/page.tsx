import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "For Investors | RentFlow — Usage-Based OS for Rental Bed Infrastructure",
  description:
    "RentFlow investor thesis: category creation in India PG and co-living infrastructure. Usage-based model, capability architecture, multi-portal defensibility.",
};

export default function ForInvestorsPage() {
  return (
    <>
      <Section background="white" className="pt-24 sm:pt-28">
        <Container size="narrow" className="text-center">
          <Badge variant="blue" className="mb-4">
            Category
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Usage-Based OS for Rental Bed Infrastructure
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            India&apos;s PG market is operationally complex and digitally fragmented. Global property tools weren&apos;t built for shared meters, pro-rata, and Indian compliance. RentFlow was.
          </p>
          <div className="mt-10">
            <Button href="#request-deck" variant="primary" size="lg">
              Request deck
            </Button>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why India&apos;s PG market is structurally complex
          </h2>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="text-slate-400">•</span>
              <span><strong>Bed-level billing</strong> — Not unit-level; shared spaces, pro-rata utilities, multiple rent components.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">•</span>
              <span><strong>Utility disputes</strong> — Manual splits, meter reading errors, and collection delays.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">•</span>
              <span><strong>High churn</strong> — Short stays, frequent move-ins/move-outs, deposits and notice tracking.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">•</span>
              <span><strong>Informal operations</strong> — Excel, WhatsApp, and fragmented tools; no single source of truth.</span>
            </li>
          </ul>
        </Container>
      </Section>

      <Section background="white">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why global tools fail here
          </h2>
          <p className="text-slate-700 mb-6">
            Global PM tools optimize for leases and units. We optimize for beds, bills, and Indian operational reality.
          </p>
          <ul className="space-y-3 text-slate-700">
            <li>Built for single-tenant or Western lease structures, not shared living and multi-component rent.</li>
            <li>No native utility splitting, Indian payment stack (UPI, Razorpay), or GST-first reporting.</li>
            <li>Per-seat or per-property pricing doesn&apos;t fit thin-margin, variable-occupancy PG economics.</li>
            <li>No &quot;operating system&quot; mindset—they&apos;re point solutions that don&apos;t connect into one event stream.</li>
          </ul>
        </Container>
      </Section>

      <Section background="muted">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why RentFlow wins
          </h2>
          <ul className="space-y-4 text-slate-700">
            <li><strong>Metering layer</strong> — We don&apos;t sell seats. We meter usage. When our customers grow, we grow with them—without renegotiating contracts.</li>
            <li><strong>Capability architecture</strong> — Capability-driven design means we can flex pricing and packaging without re-architecting. That&apos;s product optionality for us and clarity for customers.</li>
            <li><strong>Domain utility engine</strong> — Utility automation is the wedge: daily use, clear ROI, and the path to owning the full operational stack.</li>
            <li><strong>Multi-portal model</strong> — One platform, four applications today—and designed for more. Each new surface deepens data and defensibility.</li>
            <li><strong>Audit-first backend</strong> — Event-driven, audit trail, compliance-ready for institutional customers.</li>
          </ul>
        </Container>
      </Section>

      <Section background="white">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Business model
          </h2>
          <p className="text-slate-700 mb-6">
            Pay for what you use: metered transactions (e.g. rent collected, invoices generated), utility allocation usage, and automation usage. No bloated subscriptions. Example scenarios:
          </p>
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
            <p className="font-semibold text-slate-900">Small PG (40 beds)</p>
            <p className="text-sm text-slate-600">Typical monthly usage: ₹2,000–4,000 depending on occupancy and transactions.</p>
            <p className="font-semibold text-slate-900 mt-4">Growing operator (200 beds)</p>
            <p className="text-sm text-slate-600">Scales with volume; no renegotiation. Typical band: ₹8,000–15,000/month.</p>
            <p className="font-semibold text-slate-900 mt-4">Enterprise (1,000+ beds)</p>
            <p className="text-sm text-slate-600">Custom pricing, SLA, and dedicated support. Volume-based.</p>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Early traction
          </h2>
          <p className="text-slate-600 mb-6">
            Pilot operators onboarded; bed volume and revenue flow structure in place. Metrics and case studies will be updated as we scale.
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl font-bold text-slate-900">Pilot</p>
              <p className="text-sm text-slate-600">Operators</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl font-bold text-slate-900">Pilot</p>
              <p className="text-sm text-slate-600">Bed volume</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="dark" id="request-deck" className="!py-16">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Request deck
          </h2>
          <p className="text-slate-300 mb-8">
            Email us for the investor brief and deck.
          </p>
          <form
            action="#"
            method="post"
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              required
              className="flex-1 min-h-[44px] px-4 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" variant="secondary" size="md">
              Request deck
            </Button>
          </form>
          <p className="mt-4 text-sm text-slate-500">
            Or email <a href="mailto:investors@rentflow.in" className="text-blue-400 hover:underline">investors@rentflow.in</a>
          </p>
        </Container>
      </Section>
    </>
  );
}
