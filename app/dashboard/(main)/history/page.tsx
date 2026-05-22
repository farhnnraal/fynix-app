"use client";

import { useState } from "react";
import HistoryCard from "@/components/ui/HistoryCard";

const DUMMY_HISTORY = [
  {
    id: 1,
    title: "Artificial Intelligence",
    date: "26 April 2026, 08:00",
    status: "Passed" as const,
    level: "Advance Level",
    score: 95,
  },
  {
    id: 2,
    title: "Calculus",
    date: "12 Maret 2026, 13:00",
    status: "Failed" as const,
    level: "Beginner Level",
    score: 60,
  },
  {
    id: 3,
    title: "Music Rock History",
    date: "21 Februari 2026, 14:00",
    status: "Passed" as const,
    level: "Intermediate Level",
    score: 80,
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex flex-col gap-4 p-6">
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-h3 font-bold text-neutral-900">Learning History</h3>
        <p className="text-body text-neutral-500">List of all your learning history.</p>
      </div>
      <div className="w-full flex gap-3 items-stretch">
        <div className="flex-1 bg-white border border-neutral-200 rounded-lg p-[12px] flex items-center gap-3 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 text-neutral-800">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input type="text" placeholder="Search topic here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-[14px] text-neutral-800 placeholder-neutral-400 outline-none" />
        </div>

        <button type="button" className="aspect-square bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 outline-none p-3 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h7.5" />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col gap-4">
        {DUMMY_HISTORY.map((item) => (
          <HistoryCard key={item.id} id={item.id} title={item.title} date={item.date} status={item.status} level={item.level} score={item.score} />
        ))}
      </div>
    </div>
  );
}
