"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type MonthlyReport = {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  marketingSpend: number;
  users: number;
};

type DashboardContextType = {
  reports: MonthlyReport[];
  addReport: (report: MonthlyReport) => void;
  deleteReport: (id: string) => void;
  totalRevenue: number;
  totalProfit: number;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Default "Seed" Data for new visitors
const initialData: MonthlyReport[] = [
  { id: "1", month: "August 2025", revenue: 98345, expenses: 43000, marketingSpend: 5011, users: 343 },
  { id: "2", month: "September 2025", revenue: 131821, expenses: 70000, marketingSpend: 9035, users: 635 },
  { id: "3", month: "October 2025", revenue: 179938, expenses: 85000, marketingSpend: 12077, users: 1474 },
  { id: "4", month: "November 2025", revenue: 212783, expenses: 40000, marketingSpend: 7766, users: 1459 },
];

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<MonthlyReport[]>([]);

  useEffect(() => {
    // Check LocalStorage first
    const saved = localStorage.getItem("dashboard_data_v3"); // New key to force refresh
    if (saved) {
      setReports(JSON.parse(saved));
    } else {
      // If empty, load the Seed Data
      setReports(initialData);
    }
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem("dashboard_data_v3", JSON.stringify(reports));
    }
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