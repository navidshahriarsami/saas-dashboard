"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type MonthlyReport = {
  id: string;
  month: string;
  revenue: number;
  expenses: number; // Operational expenses (Server, Salaries)
  marketingSpend: number; // Ad spend
  users: number; // New users acquired
};

type DashboardContextType = {
  reports: MonthlyReport[];
  addReport: (report: MonthlyReport) => void;
  deleteReport: (id: string) => void;
  totalRevenue: number;
  totalProfit: number;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<MonthlyReport[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard_data_v2"); // Changed key to reset old data
    if (saved) setReports(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard_data_v2", JSON.stringify(reports));
  }, [reports]);

  const addReport = (report: MonthlyReport) => {
    setReports([...reports, report]);
  };

  const deleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  const totalRevenue = reports.reduce((sum, r) => sum + r.revenue, 0);
  const totalProfit = reports.reduce((sum, r) => sum + (r.revenue - r.expenses - r.marketingSpend), 0);

  return (
    <DashboardContext.Provider value={{ reports, addReport, deleteReport, totalRevenue, totalProfit }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
}