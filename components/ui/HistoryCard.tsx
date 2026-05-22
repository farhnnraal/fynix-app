import Link from "next/link";

export interface HistoryCardProps {
  id: number;
  title: string;
  date: string;
  status: "Passed" | "Failed";
  level: string;
  score: number;
}

export default function HistoryCard({ id, title, date, status, level, score }: HistoryCardProps) {
  const statusBadgeStyles = status === "Passed" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  console.log(title);

  return (
    <Link href={`/dashboard/history/${id}`} className="w-full bg-white border border-neutral-300 rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex justify-between items-start gap-2">
          <h4 className="text-h4 font-bold text-neutral-900 leading-tight">{title}</h4>
          <span className={`px-2 py-1 rounded-md text-[12px] font-bold ${statusBadgeStyles}`}>{status}</span>
        </div>
        <p className="text-caption text-neutral-400">{date}</p>
      </div>

      <hr className="border-t border-neutral-300" />

      <div className="w-full flex items-center gap-4 text-[12px] font-medium text-neutral-700">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-500">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.036-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.036-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
          </svg>
          <span>{level}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75v9.75H21.75c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M13.5 2.255A9.751 9.751 0 0 1 21.745 10.5H13.5V2.255Z" clipRule="evenodd" />
          </svg>
          <span>Score {score}/100</span>
        </div>
      </div>
    </Link>
  );
}
