import { LayoutDashboard, Users, Settings, BarChart3 } from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 }, // Changed from #
  { name: "Users", href: "/users", icon: Users },             // Changed from #
  { name: "Settings", href: "/settings", icon: Settings },    // Changed from #
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold">TaskFlow</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-slate-400 group-hover:text-white" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}