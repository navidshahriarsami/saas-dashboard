"use client"; // This is required for interactivity

import { useState } from "react";

export function AnalyticsForm() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [users, setUsers] = useState(0);

  // Automatic Math Calculations
  const profit = revenue - expenses;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Report Saved!\nNet Profit: $${profit}\nMargin: ${margin}%`);
    // In a real app, this would send data to a database
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* The Input Form */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Enter Monthly Stats</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Revenue ($)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Expenses ($)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              onChange={(e) => setExpenses(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Users</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0"
              onChange={(e) => setUsers(Number(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Report
          </button>
        </form>
      </div>

      {/* The Live Preview (Auto-Math) */}
      <div className="space-y-4">
        <div className="rounded-xl border bg-slate-900 p-6 text-white shadow-sm">
          <h3 className="text-sm font-medium text-slate-400">Projected Net Profit</h3>
          <div className={`mt-2 text-4xl font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
            ${profit.toLocaleString()}
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Profit Margin: <span className="text-white">{margin}%</span>
          </p>
        </div>
        
        <div className="rounded-xl border bg-white p-6 shadow-sm">
           <h3 className="text-sm font-medium text-gray-500">Cost Analysis</h3>
           <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
             <div 
               className="h-4 rounded-full bg-red-500 transition-all duration-500" 
               style={{ width: `${Math.min((expenses / (revenue || 1)) * 100, 100)}%` }}
             ></div>
           </div>
           <p className="mt-2 text-xs text-gray-500">Expenses are {Math.min((expenses / (revenue || 1)) * 100, 100).toFixed(0)}% of Revenue</p>
        </div>
      </div>
    </div>
  );
}