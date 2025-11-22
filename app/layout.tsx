import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/AppSidebar"; 
import { DashboardProvider } from "./context/DashboardContext";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow | Premium Analytics",
  description: "Enterprise SaaS Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30`}>
        <DashboardProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10">
              {/* Emerald Glow */}
              <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
              
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>
        </DashboardProvider>
      </body>
    </html>
  );
}