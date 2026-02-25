import type { Metadata } from "next";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Register | RentFlow",
  description: "Create your RentFlow account.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[100dvh] min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="text-center max-w-md w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Register</h1>
        <p className="text-slate-600 text-sm sm:text-base mb-6">Auth flow placeholder. Wire to modules/auth.</p>
        <a href={routes.home} className="text-blue-600 hover:underline min-h-[44px] inline-flex items-center justify-center">Back to home</a>
      </div>
    </div>
  );
}
