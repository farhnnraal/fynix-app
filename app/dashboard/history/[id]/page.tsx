"use client";

import { useRouter } from "next/navigation";
import QuestionBreakdownAccordion from "@/components/ui/QuestionBreakdownAccordion";
import CircularProgressBar from "@/components/ui/CircularProgressBar";

export default function HistoryDetailPage() {
  const router = useRouter();

  return (
    <div className="w-full h-dvh flex flex-col items-center max-w-[390px] mx-auto bg-neutral-50 min-h-screen pb-[161px] relative">
      <div className="overflow-y-auto p-6">
        <div className="w-full flex justify-between items-center mb-10">
          <button onClick={() => router.back()} className="w-[44px] h-[44px] bg-white rounded-full border border-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h3 className="text-h3 font-medium text-neutral-900">Evaluation Result</h3>
          <button type="button" className="w-[44px] h-[44px] bg-white rounded-full border border-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-neutral-700">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <CircularProgressBar value={90} />
        </div>

        {/* 3. METADATA DETAIL */}
        <div className="w-full text-center mb-8">
          <h2 className="text-h2 font-bold mb-2">Artificial Intelligence</h2>

          {/* Info Tags Row */}
          <div className="flex items-center justify-center gap-4 text-[12px] font-medium text-neutral-500">
            {/* Level Tag */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-500">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.036-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.036-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
              <span className="text-badge">Beginner Level</span>
            </div>

            {/* Status Tag */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                <circle cx="12" cy="12" r="10" fill="#00C853" />
                <path d="M8.5 12.5L11 15L16 9" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-badge">Status Passed</span>
            </div>

            {/* Date Tag */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="text-badge">26 April 2026</span>
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <section className="mb-6">
          <h3 className="text-h3 font-medium mb-1">AI Feedback</h3>
          <p className="text-body text-neutral-700 mb-4">A quick summary of your learning performance</p>
          <div className="p-4 rounded-lg bg-white border border-neutral-300 text-caption text-neutral-500">
            Excellent work! You have demonstrated a deep understanding of Artificial Intelligence concepts. Your explanations are clear and well-structured. Just review the minor points in the breakdown below to hit that perfect score next time!
          </div>
        </section>

        {/* Question Breakdown */}
        <section>
          <h3 className="text-h3 font-medium mb-1">Question Breakdown</h3>
          <p className="text-body text-neutral-700 mb-4">Your understanding level per question</p>
          <div className="space-y-4">
            <QuestionBreakdownAccordion
              title="Question 1"
              question="What is the definition of Machine Learning?"
              answer="Machine learning is a type of computer science where computers learn from data and experience rather than being given step-by-step instructions"
              aiFeedback="Great definition! Recognizing patterns from data is exactly how ML works."
              understandLabel="Understood"
            />
            <QuestionBreakdownAccordion
              title="Question 2"
              question="What is the definition of Machine Learning?"
              answer="Machine learning is a type of computer science where computers learn from data and experience rather than being given step-by-step instructions"
              aiFeedback="Great definition! Recognizing patterns from data is exactly how ML works."
              understandLabel="Partial"
            />
            <QuestionBreakdownAccordion
              title="Question 3"
              question="What is the definition of Machine Learning?"
              answer="Machine learning is a type of computer science where computers learn from data and experience rather than being given step-by-step instructions"
              aiFeedback="Great definition! Recognizing patterns from data is exactly how ML works."
              understandLabel="Not Understood"
            />
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-3xl z-40 space-y-4">
        <button type="button" className="w-full p-[16px] text-body bg-primary-500 flex items-center justify-center text-white rounded-full font-medium">
          Continue Learning
        </button>
        <button type="button" className="w-full p-[16px] text-body bg-white border border-neutral-200 flex items-center justify-center rounded-full font-medium text-neutral-700">
          See Material Summary
        </button>
      </div>
    </div>
  );
}
