import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";

export const metadata: Metadata = {
  title: "Pricing | RentFlow — Pay Only for What You Use",
  description:
    "RentFlow pricing: usage-based, no bloated subscriptions. Capabilities activated per need, metered transactions, utility allocation.",
};

const faqItems: FAQItem[] = [
  {
    question: "What counts as usage?",
    answer:
      "Usage typically includes metered events such as rent transactions processed, invoices generated, utility allocation cycles, and automation actions. Exact metering is explained during onboarding.",
  },
  {
    question: "Can I cap my spend?",
    answer:
      "Yes. We can set spend caps or alerts so you stay within budget. Discuss with us during demo or onboarding.",
  },
  {
    question: "Is there a minimum?",
    answer:
      "We keep minimums low so small operators can start. Specific minimums depend on plan; shared during demo.",
  },
  {
    question: "Do tenants pay?",
    answer:
      "No. Tenants do not pay RentFlow. You pay for the platform; you collect rent from tenants as usual.",
  },
  {
    question: "How do disputes and refunds work?",
    answer:
      "Dispute and refund handling is part of the platform workflow. Refunds you process through your payment provider are reflected in your usage and reporting. We don't charge per refund in a punitive way.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section background="white" className="pt-24 sm:pt-28">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Pay only for what you use
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            No bloated subscriptions. Activate capabilities per need. Metered transactions, utility allocation usage, and automation usage. Your cost scales with your operations.
          </p>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            No per-seat fees. No per-property caps. Typically ₹2,000–6,000/month for a 40-bed PG—depends on occupancy and transaction volume.
          </p>
          <p className="mt-6 text-sm text-slate-600 max-w-lg mx-auto">
            14-day trial. No credit card. Usage-based—you only pay when you&apos;re collecting rent.
          </p>
          <div className="mt-10">
            <Button href="/#demo" variant="primary" size="lg">
              Book a demo
            </Button>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Traditional vs RentFlow
          </h2>
          <p className="text-center text-slate-600 text-sm mb-8">
            Traditional software: ₹45,000/year fixed. RentFlow: typically ₹24,000–72,000/year depending on scale—and you only pay when you&apos;re earning.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white max-w-3xl mx-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 font-semibold text-slate-900"> </th>
                  <th className="p-4 font-semibold text-slate-900">Traditional</th>
                  <th className="p-4 font-semibold text-slate-900">RentFlow</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium">Initial cost</td>
                  <td className="p-4">High setup / custom</td>
                  <td className="p-4">Low; usage-based from day one</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium">Monthly cost</td>
                  <td className="p-4">Fixed (e.g. ₹10K+) regardless of occupancy</td>
                  <td className="p-4">Scales with activity; low occupancy = lower cost</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 font-medium">What&apos;s included</td>
                  <td className="p-4">Often feature-bundled or limited</td>
                  <td className="p-4">Capabilities per need; metered</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Scalability</td>
                  <td className="p-4">Re-negotiate or re-platform</td>
                  <td className="p-4">Same stack from 1 to 1,000+ properties</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Example scenarios
          </h2>
          <p className="text-center text-slate-600 text-sm mb-4">
            Pay for what you process—invoices, collections, utility bills.
          </p>
          <p className="text-center text-slate-600 text-sm mb-10">
            Indicative; actual pricing discussed in demo. Placeholders labeled where applicable.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Scenario 1
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Small PG — 40 beds</h3>
              <p className="mt-3 text-slate-600 text-sm">
                Typical band: ₹2,000–4,000/month depending on occupancy and transaction volume. All core capabilities included.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Scenario 2
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Growing operator — 200 beds</h3>
              <p className="mt-3 text-slate-600 text-sm">
                Scales with volume. Typical band: ₹8,000–15,000/month. No per-property or per-seat caps.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Scenario 3
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Enterprise — 1,000 beds</h3>
              <p className="mt-3 text-slate-600 text-sm">
                Custom pricing, SLA, dedicated support. Volume-based; discussed with sales.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pricing FAQ
          </h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 text-center">
            <Button href="/#demo" variant="primary" size="lg">
              Book a demo
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
