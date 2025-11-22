"use client";

import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export function DashboardStats() {
  const { reports, totalRevenue, totalProfit } = useDashboard();

  // Calculate Users from reports
  const totalUsers = reports.reduce((sum, r) => sum + r.users, 0);
  
  // Calculate Margin
  const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0";

  const stats = [
    { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, desc: "All time" },
    { name: "Net Profit", value: `$${totalProfit.toLocaleString()}`, icon: CreditCard, desc: `Margin: ${margin}%` },
    { name: "Total Users", value: totalUsers.toLocaleString(), icon: Users, desc: "Acquired" },
    { name: "Reports Filed", value: reports.length.toString(), icon: Activity, desc: "Months tracked" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <stat.icon className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <p className="text-xs text-gray-500">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
}