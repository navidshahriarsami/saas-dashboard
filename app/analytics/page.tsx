import { ReportsTable } from "../components/ReportsTable";
import { AdminGuard } from "../components/AdminGuard";

export default function AnalyticsPage() {
  return (
    <AdminGuard>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Financial Reports</h1>
            <p className="text-zinc-400 mt-1">Manage monthly financial data & ROI.</p>
          </div>
          <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-400">
            Confidential
          </span>
        </div>
        
        <ReportsTable />
      </div>
    </AdminGuard>
  );
}