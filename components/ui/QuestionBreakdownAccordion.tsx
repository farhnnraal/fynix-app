"use client";

import { useState } from "react";

export interface QuestionAccordionProps {
  title: string;
  question: string;
  answer: string;
  aiFeedback: string;
  understandLabel: "Understood" | "Partial" | "Not Understood";
}

export default function QuestionBreakdownAccordion({ title, question, answer, aiFeedback, understandLabel }: QuestionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeStyles = () => {
    switch (understandLabel) {
      case "Understood":
        return "bg-green-50 text-green-500";
      case "Partial":
        return "bg-amber-50 text-amber-500";
      case "Not Understood":
        return "bg-red-50 text-red-500";
      default:
        return "bg-neutral-50 text-neutral-500";
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-300 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-200">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between gap-4 outline-none text-left">
        <h4 className="text-h4">{title}</h4>
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-md text-badge ${getBadgeStyles()}`}>{understandLabel}</span>
          <div className={`w-[28px] h-[28px] rounded-full border border-neutral-200 flex items-center justify-center text-neutral-800 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <hr className="border-t border-neutral-300 mx-5" />

          <div className="p-4 flex flex-col gap-4 text-[13px] leading-relaxed">
            <div className="flex flex-col gap-1">
              <span className="text-label">Question</span>
              <p className="text-neutral-500 text-caption">{question}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label">Your Answer</span>
              <p className="text-neutral-500 text-caption">{answer}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-label">
                <span className="text-label">AI Feedback</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-primary-500 animate-pulse">
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.84 2.52a1.75 1.75 0 0 0 1.117 1.117l2.52.84a.75.75 0 0 1 0 1.436l-2.52.84a1.75 1.75 0 0 0-1.117 1.117l-.84 2.52a.75.75 0 0 1-1.436 0l-.84-2.52a1.75 1.75 0 0 0-1.117-1.117l-2.52-.84a.75.75 0 0 1 0-1.436l2.52-.84a1.75 1.75 0 0 0 1.117-1.117l.84-2.52A.75.75 0 0 1 9 4.5ZM18.75 16.5a.5.5 0 0 1 .48.363l.28.84a.5.5 0 0 0 .319.319l.84.28a.5.5 0 0 1 0 .956l-.84.28a.5.5 0 0 0-.319.319l-.28.84a.5.5 0 0 1-.956 0l-.28-.84a.5.5 0 0 0-.319-.319l-.84-.28a.5.5 0 0 1 0-.956l.84-.28a.5.5 0 0 0 .319-.319l.28-.84a.5.5 0 0 1 .48-.363ZM16.25 3.75a.5.5 0 0 1 .48.363l.28.84a.5.5 0 0 0 .319.319l.84.28a.5.5 0 0 1 0 .956l-.84.28a.5.5 0 0 0-.319.319l-.28.84a.5.5 0 0 1-.956 0l-.28-.84a.5.5 0 0 0-.319-.319l-.84-.28a.5.5 0 0 1 0-.956l.84-.28a.5.5 0 0 0 .319-.319l.28-.84a.5.5 0 0 1 .48-.363Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-neutral-500 text-caption">{aiFeedback}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
