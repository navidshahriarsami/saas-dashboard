import { ReportsTable } from "../components/ReportsTable";
import { UnitEconomicsWidget } from "../components/UnitEconomicsWidget";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Financial Reports</h1>
          <p className="text-zinc-500 mt-1">Manage monthly financial data & ROI.</p>
        </div>
        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-sm font-medium text-emerald-600">
          Confidential
        </span>
      </div>

      <UnitEconomicsWidget />
      <ReportsTable />
    </div>
  );
}