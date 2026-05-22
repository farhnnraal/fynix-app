"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  value: number;
  className?: string;
}

function getColor(value: number): string {
  if (value >= 76) return "#22c55e";
  if (value >= 41) return "#eab308";
  return "#ef4444";
}

export default function CircularProgressBar({ value, className = "" }: CircularProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const color = getColor(clampedValue);

  return (
    <div className={`size-30 relative ${className}`}>
      <CircularProgressbar
        value={clampedValue}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#e5e7eb",
        })}
        counterClockwise={true}
        strokeWidth={10}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-2xl leading-7 font-bold text-center">
          {clampedValue}
          <span className="text-sm">/100</span>
        </p>
        <p className="text-badge text-center text-neutral-500">Total Skor</p>
      </div>
    </div>
  );
}
