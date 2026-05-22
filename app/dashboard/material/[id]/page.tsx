"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MaterialPage() {
  const router = useRouter();

  return (
    <div className="w-full h-dvh flex flex-col max-w-[390px] mx-auto bg-neutral-50 min-h-screen pb-[161px] relative">
      <div className="overflow-y-auto p-6">
        <button
          onClick={() => router.back()}
          className="w-[44px] h-[44px] bg-white rounded-full border border-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <h3 className="text-h3 font-medium mb-2">Topik Pembahasan</h3>
        <p className="text-body text-neutral-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et corporis temporibus ea nihil at fuga, nobis labore ipsam dignissimos eum
          maiores itaque corrupti quaerat sunt enim laudantium repellat dolores cum sit velit ipsum. Quam id odio reiciendis cum ad voluptatem alias
          consequatur ducimus, quos praesentium culpa aliquid totam ipsam aperiam.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-3xl z-40 space-y-4">
        <Link
          href="/lab"
          className="w-full p-[16px] text-body bg-primary-500 flex items-center justify-center text-white rounded-full font-medium"
        >
          Start Fenyman Test
        </Link>
      </div>
    </div>
  );
}
