import type { Metadata } from "next";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Dashboard | RentFlow",
  description: "Manage your properties and portfolio.",
};

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Dashboard</h1>
      <p className="text-slate-600 text-sm sm:text-base mb-4">Dashboard placeholder. Wire to modules/dashboard.</p>
      <a href={routes.home} className="text-blue-600 hover:underline text-sm sm:text-base min-h-[44px] inline-flex items-center">Back to home</a>
    </div>
  );
}
