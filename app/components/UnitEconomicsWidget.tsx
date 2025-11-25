"use client";

import { useDashboard } from "../context/DashboardContext";
import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";

export function UnitEconomicsWidget() {
    const { reports } = useDashboard();

    // Get the latest month's data for "Current" metrics
    const latest = reports[reports.length - 1] || {
        revenue: 0,
        marketingSpend: 0,
        users: 0,
        churnedUsers: 0,
        totalUsers: 0,
    };

    // 1. ARPU (Average Revenue Per User)
    const arpu = latest.totalUsers > 0 ? latest.revenue / latest.totalUsers : 0;

    // 2. CAC (Customer Acquisition Cost)
    const cac = latest.users > 0 ? latest.marketingSpend / latest.users : 0;

    // 3. Churn Rate %
    const churnRate = latest.totalUsers > 0 ? latest.churnedUsers / latest.totalUsers : 0;

    // 4. LTV (Lifetime Value) = ARPU / Churn Rate
    const ltv = churnRate > 0 ? arpu / churnRate : 0;

    // 5. LTV:CAC Ratio
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    // Helper to format currency
    const fmt = (n: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(n);

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* LTV Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Customer LTV</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{fmt(ltv)}</p>
                    </div>
                    <div className="rounded-full bg-indigo-50 p-3 text-indigo-600">
                        <Users className="h-6 w-6" />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-zinc-500">
                    <span className="text-zinc-500">ARPU: {fmt(arpu)}</span>
                    <span className="mx-2">•</span>
                    <span className="text-rose-500">Churn: {(churnRate * 100).toFixed(1)}%</span>
                </div>
            </div>

            {/* CAC Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">CAC</p>
                        <p className="mt-2 text-3xl font-bold text-zinc-900">{fmt(cac)}</p>
                    </div>
                    <div className="rounded-full bg-rose-50 p-3 text-rose-500">
                        <CreditCard className="h-6 w-6" />
                    </div>
                </div>
                <div className="mt-4 text-xs text-zinc-500">
                    Cost to acquire a new customer
                </div>
            </div>

            {/* LTV:CAC Ratio Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">LTV:CAC Ratio</p>
                        <p className={`mt-2 text-3xl font-bold ${ltvCacRatio >= 3 ? "text-emerald-600" : "text-yellow-600"}`}>
                            {ltvCacRatio.toFixed(1)}x
                        </p>
                    </div>
                    <div className={`rounded-full p-3 ${ltvCacRatio >= 3 ? "bg-emerald-50 text-emerald-600" : "bg-yellow-50 text-yellow-600"}`}>
                        <Activity className="h-6 w-6" />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                    {ltvCacRatio >= 3 ? (
                        <span className="flex items-center text-emerald-600">
                            <TrendingUp className="mr-1 h-3 w-3" /> Healthy Growth
                        </span>
                    ) : (
                        <span className="text-yellow-600">Needs Optimization (Target 3.0x)</span>
                    )}
                </div>
            </div>
        </div>
    );
}
