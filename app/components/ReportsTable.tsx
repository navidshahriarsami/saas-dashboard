"use client";

import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";

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

    setNewMonth(""); setNewRevenue(""); setNewExpenses(""); setNewMarketing(""); setNewUsers("");
  };

  // Shared Input Class
  const inputClass = "w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500";

  return (
    <div className="space-y-6">
      {/* Dark Entry Form */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-white">Add Financial Data</h3>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
          <div className="w-32">
            <label className="mb-1 block text-xs font-bold text-zinc-500 uppercase">Month</label>
            <input type="text" placeholder="Nov 2024" className={inputClass}
              value={newMonth} onChange={(e) => setNewMonth(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs font-bold text-zinc-500 uppercase">Revenue</label>
            <input type="number" placeholder="0" className={inputClass}
              value={newRevenue} onChange={(e) => setNewRevenue(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs font-bold text-zinc-500 uppercase">Ops Cost</label>
            <input type="number" placeholder="0" className={inputClass}
              value={newExpenses} onChange={(e) => setNewExpenses(e.target.value)} />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs font-bold text-indigo-400 uppercase">Ad Spend</label>
            <input type="number" placeholder="0" className={inputClass}
              value={newMarketing} onChange={(e) => setNewMarketing(e.target.value)} />
          </div>
          <div className="w-24">
            <label className="mb-1 block text-xs font-bold text-zinc-500 uppercase">New Users</label>
            <input type="number" placeholder="0" className={inputClass}
              value={newUsers} onChange={(e) => setNewUsers(e.target.value)} />
          </div>
          <button type="submit" className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">
            + Add Entry
          </button>
        </form>
      </div>

      {/* Dark Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950/50 text-zinc-400">
            <tr>
              <th className="px-6 py-4 font-medium">Month</th>
              <th className="px-6 py-4 font-medium">Revenue</th>
              <th className="px-6 py-4 font-medium">Net Profit</th>
              <th className="px-6 py-4 font-medium text-indigo-400">CAC</th>
              <th className="px-6 py-4 font-medium">Margin %</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {reports.map((r) => {
              const netProfit = r.revenue - r.expenses - r.marketingSpend;
              const cac = r.users > 0 ? (r.marketingSpend / r.users).toFixed(2) : "0.00";
              const margin = r.revenue > 0 ? ((netProfit / r.revenue) * 100).toFixed(1) : "0";
              const isProfitable = netProfit > 0;

              return (
                <tr key={r.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{r.month}</td>
                  <td className="px-6 py-4 text-zinc-300">${r.revenue.toLocaleString()}</td>
                  <td className={`px-6 py-4 font-bold ${isProfitable ? "text-emerald-400" : "text-rose-400"}`}>
                    {isProfitable ? "+" : ""}${netProfit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-indigo-400">
                    ${cac} <span className="text-xs text-zinc-600 font-normal">/user</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isProfitable ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                      {isProfitable ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                      {margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteReport(r.id)} className="text-zinc-500 hover:text-rose-400 transition-colors">
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