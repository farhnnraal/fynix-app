"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full bg-neutral-50 h-dvh flex flex-col justify-between box-border relative">
      <main className="w-full overflow-y-auto pb-[87px]">{children}</main>
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 rounded-t-[24px] py-4 flex justify-between items-center shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-50">
        {/* Tab HOME */}
        <Link href="/dashboard" className={`flex flex-col items-center gap-1 flex-1 transition-colors duration-200 outline-none`}>
          <div className={`p-1 rounded-xl transition-all ${isActive("/dashboard") ? "text-primary-500" : "text-neutral-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.061l-.72-.72V19.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 13 19.5v-3a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v3A1.5 1.5 0 0 1 9.5 21h-3A1.5 1.5 0 0 1 5 19.5v-6.629l-.72.72a.75.75 0 1 1-1.06-1.061l8.69-8.69Z" />
            </svg>
          </div>
          <span className={`text-body ${isActive("/dashboard") ? "text-primary-500 font-bold" : "text-neutral-400"}`}>Home</span>
        </Link>

        {/* Tab HISTORY */}
        <Link href="/dashboard/history" className="flex flex-col items-center gap-1 flex-1 transition-colors duration-200 outline-none">
          <div className={`p-1 rounded-xl transition-all ${isActive("/dashboard/history") ? "text-primary-500" : "text-neutral-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span className={`text-body ${isActive("/dashboard/history") ? "text-primary-500 font-bold" : "text-neutral-400"}`}>History</span>
        </Link>

        {/* Tab PROFILE */}
        <Link href="/dashboard/profile" className="flex flex-col items-center gap-1 flex-1 transition-colors duration-200 outline-none">
          <div className={`p-1 rounded-xl transition-all ${isActive("/dashboard/profile") ? "text-primary-500" : "text-neutral-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <span className={`text-body ${isActive("/dashboard/profile") ? "text-primary-500 font-bold" : "text-neutral-400"}`}>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
