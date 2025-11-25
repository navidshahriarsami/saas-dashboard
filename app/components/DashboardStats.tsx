"use client";

import { DollarSign, Users, CreditCard, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export function DashboardStats() {
  const { reports, totalRevenue, totalProfit } = useDashboard();

  // Calculate MoM Growth
  const currentMonth = reports[reports.length - 1];
  const prevMonth = reports[reports.length - 2];
  let growth = 0;

  if (currentMonth && prevMonth && prevMonth.revenue > 0) {
    growth = ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
  }

  // Use the latest "Total Active Users" if available, otherwise sum new users
  const activeUsers = currentMonth ? currentMonth.totalUsers : 0;
  const margin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0";

  const stats = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      desc: "All time",
      trend: growth
    },
    {
      name: "Net Profit",
      value: `$${totalProfit.toLocaleString()}`,
      icon: CreditCard,
      desc: `Margin: ${margin}%`
    },
    {
      name: "Active Users",
      value: activeUsers.toLocaleString(),
      icon: Users,
      desc: "Current active base"
    },
    {
      name: "Reports Filed",
      value: reports.length.toString(),
      icon: Activity,
      desc: "Months tracked"
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 shadow-sm hover:border-zinc-700 transition-colors">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-zinc-400">{stat.name}</h3>
            <stat.icon className={`h-4 w-4 ${stat.name === "Total Revenue" ? "text-emerald-400" : "text-zinc-500"}`} />
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>

          <div className="flex items-center mt-1">
            {stat.trend !== undefined && (
              <span className={`flex items-center text-xs font-medium mr-2 ${stat.trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {stat.trend >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                {Math.abs(stat.trend).toFixed(1)}%
              </span>
            )}
            <p className="text-xs text-zinc-500">{stat.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}