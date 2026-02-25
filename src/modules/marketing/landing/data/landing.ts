export type Feature = {
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    title: "Property Management",
    description:
      "Drag-and-drop floor plans, room templates, amenity tracking, and maintenance schedules.",
  },
  {
    title: "Tenant Lifecycle",
    description:
      "Digital applications, background checks, e-sign agreements, and notice tracking.",
  },
  {
    title: "Auto Invoicing",
    description:
      "Recurring rent invoices, pro-rata calculations, automatic late fees, and multi-component billing.",
  },
  {
    title: "Payment Collection",
    description:
      "UPI QR codes, Razorpay/Stripe integration, auto-reconciliation, and payment reminders.",
  },
  {
    title: "Analytics & Reports",
    description:
      "Real-time occupancy, revenue vs expenses, GST reports, and property-wise profitability.",
  },
  {
    title: "Communication Hub",
    description:
      "WhatsApp, SMS, email notifications, and automated reminders for rent and maintenance.",
  },
];

export type HowItWorksStep = {
  step: string;
  title: string;
  description: string;
};

export const howItWorks: HowItWorksStep[] = [
  {
    step: "01",
    title: "Set Up Your Properties",
    description:
      "Add your properties, floors, rooms, and beds with our intuitive drag-and-drop interface.",
  },
  {
    step: "02",
    title: "Add Tenants",
    description:
      "Onboard tenants with digital forms, collect documents, and set up automated rent collection.",
  },
  {
    step: "03",
    title: "Automate & Relax",
    description:
      "Let RentFlow handle invoicing, payments, utilities, and reminders while you focus on growth.",
  },
];
