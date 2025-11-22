"use client";

import { LayoutDashboard, BarChart3, Waypoints } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="hidden md:flex h-screen w-72 flex-col p-4">
      {/* Glass Container */}
      <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        
        {/* Logo Area */}
        <div className="flex h-24 items-center justify-center border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Waypoints className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">TaskFlow</h1>
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
                className={`group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 
                  ${isActive 
                    ? "bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/5" 
                    : "text-zinc-400 hover:bg-emerald-500/10 hover:text-white hover:shadow-lg hover:shadow-emerald-500/5"
                  }`}
              >
                <item.icon className={`mr-4 h-5 w-5 transition-colors ${isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-emerald-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (Bottom) */}
        <div className="border-t border-zinc-800/50 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-950/50 p-3 border border-zinc-800">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500" />
            <div>
              <p className="text-sm font-bold text-white">Admin User</p>
              <p className="text-xs text-zinc-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}