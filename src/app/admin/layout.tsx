"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderUp, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const adminNavLinks = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Upload Resources", href: "/admin/resources", icon: FolderUp },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Persistent Desktop Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-neutral-900/40 backdrop-blur-xl p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-500">LMW Control</h2>
            <p className="text-xs text-gray-400 mt-0.5">Central Hub v1.0</p>
          </div>

          <nav className="space-y-1.5">
            {adminNavLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  <IconComponent size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-rose-400 border border-transparent hover:border-rose-500/10 transition-all text-sm font-medium"
        >
          <LogOut size={18} />
          Exit Admin Portal
        </Link>
      </aside>

      {/* Right Side Main Canvas Block */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="h-16 border-b border-white/5 bg-neutral-900/20 backdrop-blur-md px-6 flex items-center justify-between md:hidden shrink-0">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-500">LMW Admin</span>
          <div className="flex gap-4 items-center">
            <Link href="/admin" className="text-xs text-gray-400 hover:text-white">Dashboard</Link>
            <Link href="/admin/resources" className="text-xs text-gray-400 hover:text-white">Uploads</Link>
            <Link href="/" className="text-xs text-rose-400"><LogOut size={14} /></Link>
          </div>
        </header>

        {/* Dynamic Inner Child Page Injection Target Viewport */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}