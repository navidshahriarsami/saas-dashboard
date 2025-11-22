"use client";

import { DashboardStats } from "./components/DashboardStats";
import { RecentUsersTable } from "./components/RecentUsersTable";
import { useDashboard } from "./context/DashboardContext";

export default function Home() {
  const { reports } = useDashboard();

  const handleDownload = () => {
    if (reports.length === 0) {
      alert("No data to download! Add some reports in the Analytics tab first.");
      return;
    }

    // 1. Define CSV Headers
    const headers = ["Month,Revenue,Expenses,Marketing Spend,New Users,Net Profit\n"];

    // 2. Map data to rows
    const rows = reports.map(r => {
      const netProfit = r.revenue - r.expenses - r.marketingSpend;
      return `${r.month},${r.revenue},${r.expenses},${r.marketingSpend},${r.users},${netProfit}`;
    });

    // 3. Combine
    const csvContent = headers.concat(rows).join("\n");

    // 4. Create Blob and Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Overview of your SaaS performance.</p>
        </div>
        <button 
          onClick={handleDownload}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all"
        >
          Download Report
        </button>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 lg:col-span-7">
          <RecentUsersTable />
        </div>
      </div>
    </div>
  );
}