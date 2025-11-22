import { ReportsTable } from "../components/ReportsTable";
import { AdminGuard } from "../components/AdminGuard";

export default function AnalyticsPage() {
  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            Confidential
          </span>
        </div>
        <p className="text-gray-500">Manage monthly financial data.</p>
        <ReportsTable />
      </div>
    </AdminGuard>
  );
}