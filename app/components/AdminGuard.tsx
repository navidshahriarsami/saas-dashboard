"use client";

import { useState, useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Simple password
      localStorage.setItem("isAdmin", "true");
      setIsAuthenticated(true);
    } else {
      alert("Wrong Password!");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Restricted Access</h2>
        <p className="mb-6 text-gray-500">Please enter the Manager Password to view Financials.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full rounded-md border p-3 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full rounded-md bg-slate-900 py-3 font-bold text-white hover:bg-slate-800">
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}