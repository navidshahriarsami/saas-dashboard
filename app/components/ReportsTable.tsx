"use client";

import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { Trash2, Plus, TrendingUp, TrendingDown } from "lucide-react";

export function ReportsTable() {
  const { reports, addReport, deleteReport } = useDashboard();
  
  const [newMonth, setNewMonth] = useState("");
  const [newRevenue, setNewRevenue] = useState("");
  const [newExpenses, setNewExpenses] = useState("");
  const [newMarketing, setNewMarketing] = useState("");
  const [newUsers, setNewUsers] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonth || !newRevenue) return;

    addReport({
      id: Date.now().toString(),
      month: newMonth,
      revenue: Number(newRevenue),
      expenses: Number(newExpenses),
      marketingSpend: Number(newMarketing),
      users: Number(newUsers),
    });

    // Reset
    setNewMonth(""); setNewRevenue(""); setNewExpenses(""); setNewMarketing(""); setNewUsers("");
  };

  return (
    <div className="space-y-6">
      {/* Advanced Entry Form */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900">Add Financial Data</h3>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
          <div className="w-32">
            <label className="text-xs font-bold text-gray-500 uppercase">Month</label>
            <input type="text" placeholder="Nov 2024" className="w-full rounded border p-2 text-sm"
              value={newMonth} onChange={(e) => setNewMonth(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="text-xs font-bold text-gray-500 uppercase">Revenue</label>
            <input type="number" placeholder="0" className="w-full rounded border p-2 text-sm"
              value={newRevenue} onChange={(e) => setNewRevenue(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="text-xs font-bold text-gray-500 uppercase">Ops Cost</label>
            <input type="number" placeholder="0" className="w-full rounded border p-2 text-sm"
              value={newExpenses} onChange={(e) => setNewExpenses(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="text-xs font-bold text-blue-600 uppercase">Ad Spend</label>
            <input type="number" placeholder="0" className="w-full rounded border border-blue-200 p-2 text-sm"
              value={newMarketing} onChange={(e) => setNewMarketing(e.target.value)} />
          </div>
          <div className="w-24">
            <label className="text-xs font-bold text-gray-500 uppercase">New Users</label>
            <input type="number" placeholder="0" className="w-full rounded border p-2 text-sm"
              value={newUsers} onChange={(e) => setNewUsers(e.target.value)} />
          </div>
          <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
            + Add Entry
          </button>
        </form>
      </div>

      {/* The "CFO" Table */}
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Revenue</th>
              <th className="px-6 py-3">Net Profit</th>
              <th className="px-6 py-3 text-blue-600">CAC (Cost/User)</th>
              <th className="px-6 py-3">Margin %</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((r) => {
              const netProfit = r.revenue - r.expenses - r.marketingSpend;
              const cac = r.users > 0 ? (r.marketingSpend / r.users).toFixed(2) : "0.00";
              const margin = r.revenue > 0 ? ((netProfit / r.revenue) * 100).toFixed(1) : "0";
              const isProfitable = netProfit > 0;

              return (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{r.month}</td>
                  <td className="px-6 py-4">${r.revenue.toLocaleString()}</td>
                  <td className={`px-6 py-4 font-bold ${isProfitable ? "text-green-600" : "text-red-500"}`}>
                    {isProfitable ? "+" : ""}${netProfit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-blue-700">
                    ${cac} <span className="text-xs text-gray-400 font-normal">/user</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isProfitable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {isProfitable ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                      {margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteReport(r.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}