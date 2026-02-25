import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Case Studies | RentFlow — Operator Impact",
  description:
    "RentFlow case studies: operator profiles, before/after workflows, and quantified impact for PG and co-living.",
};

const caseStudies = [
  {
    id: "single-pg-bangalore",
    title: "Single PG owner, Bangalore — 45 beds",
    profile: "Independent operator, one property. Previously on Excel and WhatsApp for rent and utilities.",
    before: "Manual rent tracking, Excel utility splits, WhatsApp reminders. 15+ hours/month on admin.",
    after: "Bed-level billing and utility automation on RentFlow. Tenant portal for payments and documents.",
    improvements: "Admin time cut by ~12 hours/month. Utility disputes dropped. Single dashboard for occupancy and collections.",
    impact: "Placeholder: quantified impact (e.g. revenue recovered, time saved) to be updated with operator consent.",
  },
  {
    id: "multi-property-hyderabad",
    title: "Multi-property operator, Hyderabad — 180 beds",
    profile: "Three PGs under one operator. Needed centralized visibility and consistent processes.",
    before: "Three separate Excel sheets, different payment methods per property, no unified reporting.",
    after: "One RentFlow account, all properties with capability-based setup. Centralized P&L and occupancy.",
    improvements: "Unified reporting, automated invoicing and reminders across properties. Role-based access for staff.",
    impact: "Placeholder: quantified impact to be updated with operator consent.",
  },
  {
    id: "coliving-pilot",
    title: "Co-living pilot — 120 beds",
    profile: "Early-stage co-living operator testing RentFlow for operations and investor reporting.",
    before: "Mix of property tools and spreadsheets; audit trail was manual.",
    after: "RentFlow for bed management, utilities, collections, and audit-ready export for investors.",
    improvements: "Audit trail in place. Investor-ready reports. Utility allocation and proration automated.",
    impact: "Placeholder: impact metrics to be updated with operator consent.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Section background="white" className="pt-24 sm:pt-28">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Case studies
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Operator profiles, before/after workflows, and operational improvements. Quantified impact updated with operator consent.
          </p>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="space-y-12">
            {caseStudies.map((cs) => (
              <Card key={cs.id} padding="lg" className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-slate-900">{cs.title}</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Operator profile
                    </h3>
                    <p className="mt-2 text-slate-700">{cs.profile}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Before
                    </h3>
                    <p className="mt-2 text-slate-700">{cs.before}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    After
                  </h3>
                  <p className="mt-2 text-slate-700">{cs.after}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Operational improvements
                  </h3>
                  <p className="mt-2 text-slate-700">{cs.improvements}</p>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-sm text-slate-600">
                    <strong>Quantified impact:</strong> {cs.impact}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Join founding operators
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Book a demo and see how RentFlow can scale your operations.
          </p>
          <Button href={`${routes.home}#demo`} variant="primary" size="lg">
            Book a demo
          </Button>
        </Container>
      </Section>
    </>
  );
}
