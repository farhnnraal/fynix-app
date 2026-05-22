import Link from "next/link";
import React from "react";

interface SubTopicSelectionProps {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function TopicSelection({ id, title, difficulty }: SubTopicSelectionProps) {
  return (
    <Link href={`/dashboard/material/${id}`} className="p-4 rounded-lg bg-white border border-neutral-300 flex items-center justify-between">
      <p className="text-body">{title}</p>
      <div className="flex items-center gap-2">
        <span className="text-caption text-neutral-500">{difficulty}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 text-neutral-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
