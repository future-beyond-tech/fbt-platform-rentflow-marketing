import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">404</h1>
      <p className="text-slate-600 text-sm sm:text-base mb-6 text-center">Could not find the requested page.</p>
      <Link
        href="/"
        className="px-6 py-3 min-h-[44px] flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base"
      >
        Return Home
      </Link>
    </div>
  );
}
