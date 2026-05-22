"use client";
import { LearningResult } from "@/.next/types/learning";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function LearningMaterial({ data }: { data: LearningResult }) {
  const topic = data.custom_ai_topics[0]; // main module

  return (
    <div className="w-full flex flex-col gap-[32px] pt-[24px]">

      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-caption text-neutral-500 font-medium tracking-wide uppercase">{topic.custom_category.name}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className={`text-caption px-2 py-0.5 rounded-full font-medium ${difficultyColor[topic.difficulty]}`}>
            {topic.difficulty}
          </span>
        </div>
        <h1 className="text-h3 font-medium text-neutral-900 leading-tight">{topic.title}</h1>
      </div>

      {/* Sub Topics as Article */}
      <article className="flex flex-col gap-[24px]">
        {topic.sub_topics.map((sub, i) => (
          <section key={sub.sub_topic_id} className="flex flex-col gap-3">
            <h3 className="text-h4 font-medium text-neutral-900">{i + 1}. {sub.title}</h3>
            <p className="text-body text-neutral-700 leading-relaxed text-justify">
              {sub.materi_default}
            </p>
          </section>
        ))}
      </article>

      {/* Questions as Material Cards */}
      <section className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </div>
          <h2 className="text-h4 font-medium text-neutral-900">Kuis Essay</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          {topic.questions.map((q, i) => (
            <div key={q.question_id} className="bg-white border border-neutral-200 rounded-2xl p-[24px] shadow-sm flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 font-medium flex items-center justify-center text-body">
                {i + 1}
              </span>
              <p className="text-body text-neutral-800 leading-relaxed pt-1">
                {q.question}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}