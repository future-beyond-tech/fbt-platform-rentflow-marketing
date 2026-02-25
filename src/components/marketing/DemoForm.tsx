"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const city = (fd.get("city") as string)?.trim();
    const beds = (fd.get("beds") as string)?.trim();

    if (!name || !email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const companyName = [city, beds ? `${beds} beds` : ""].filter(Boolean).join(" | ") || undefined;
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName: name,
          phone: phone || undefined,
          companyName,
          source: "demo",
        }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="font-semibold text-green-800">Thanks. We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="demo-name" className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            id="demo-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="demo-email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="demo-phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id="demo-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Phone"
          />
        </div>
        <div>
          <label htmlFor="demo-city" className="block text-sm font-medium text-slate-700 mb-1">
            City
          </label>
          <input
            id="demo-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          />
        </div>
        <div>
          <label htmlFor="demo-beds" className="block text-sm font-medium text-slate-700 mb-1">
            Beds managed
          </label>
          <input
            id="demo-beds"
            name="beds"
            type="text"
            inputMode="numeric"
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 40"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again or email us.</p>
      )}
      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Request demo"}
        </Button>
      </div>
    </form>
  );
}
