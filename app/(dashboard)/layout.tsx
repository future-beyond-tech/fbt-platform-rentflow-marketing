export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex-shrink-0">
        <span className="font-semibold text-slate-900 text-sm sm:text-base truncate">RentFlow Dashboard</span>
      </header>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
