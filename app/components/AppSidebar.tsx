"use client";

import { LayoutDashboard, BarChart3, Waypoints, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md md:hidden border border-zinc-200"
      >
        {isOpen ? <X className="h-6 w-6 text-zinc-600" /> : <Menu className="h-6 w-6 text-zinc-600" />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 transform bg-zinc-50 p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Glass Container */}
        <div className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white shadow-xl">

          {/* Logo Area */}
          <div className="flex h-24 items-center justify-center border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
                <Waypoints className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900">TaskFlow</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 
                    ${isActive
                      ? "bg-emerald-50 text-emerald-900 shadow-sm border border-emerald-100"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                >
                  <item.icon className={`mr-4 h-5 w-5 transition-colors ${isActive ? "text-emerald-600" : "text-zinc-400 group-hover:text-emerald-600"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile (Bottom) */}
          <div className="border-t border-zinc-100 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 border border-zinc-100">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500" />
              <div>
                <p className="text-sm font-bold text-zinc-900">Admin User</p>
                <p className="text-xs text-zinc-500">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}