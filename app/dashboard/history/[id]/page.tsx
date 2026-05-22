"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import QuestionBreakdownAccordion from "@/components/ui/QuestionBreakdownAccordion";
import CircularProgressBar from "@/components/ui/CircularProgressBar";
import { useFormState } from "react-dom";

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const historyId = params.id;

  const [historyData, setHistoryData] = useState<any | null>(null);
  const [nextLevelTopic, setNextLevelTopic] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localHistories = localStorage.getItem("learning_histories");
    const localTopics = localStorage.getItem("topics"); // Ambil data topics default dari localstorage jika ada
    const localCustomTopics = localStorage.getItem("custom_ai_topics"); // Ambil data custom topics dari localstorage jika ada

    if (localHistories && historyId) {
      try {
        const parsedHistories = JSON.parse(localHistories);
        const matchData = parsedHistories.find((item: any) => item.history_id === historyId);

        if (matchData) {
          setHistoryData(matchData);

          const topics = localTopics ? JSON.parse(localTopics) : [];
          const customAiTopics = localCustomTopics ? JSON.parse(localCustomTopics) : [];

          const isCustom = matchData.is_custom_topic;
          const sourceArray = isCustom ? customAiTopics : topics;

          const currentTopic = sourceArray.find((t: any) =>
            isCustom ? t.custom_topic_id === matchData.topic_id : t.topic_id === matchData.topic_id,
          );

          if (currentTopic) {
            const currentDiff = currentTopic.difficulty;

            const nextTopic = sourceArray.find((t: any) => {
              if (isCustom) {
                if (t.custom_topic_id === currentTopic.custom_topic_id) return false;
              } else {
                if (t.topic_id === currentTopic.topic_id) return false;
              }

              if (currentDiff === "EASY") return t.difficulty === "Medium";
              if (currentDiff === "Medium") return t.difficulty === "Hard";
              return t.difficulty === "Hard";
            });

            if (nextTopic) {
              setNextLevelTopic(nextTopic);
            }
          }
        }
      } catch (error) {
        console.error("Gagal melakukan parse data:", error);
      }
    }
    setLoading(false);
  }, [historyId]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50">Loading data...</div>;
  }

  if (!historyData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-6 text-center">
        <p className="text-neutral-600 mb-4">Maaf, detail riwayat evaluasi tidak ditemukan.</p>
        <button onClick={() => router.back()} className="text-primary-500 font-bold hover:underline">
          Kembali
        </button>
      </div>
    );
  }

  // Ambil langsung score dari historyData yang sudah ada nilainya
  // Pastikan nama key propertinya sesuai (misal: historyData.score atau historyData.total_score)
  const finalScore = historyData.score || 0;
  const isPassed = finalScore >= 75;
  return (

    <div className="w-full h-dvh flex flex-col items-center max-w-[390px] mx-auto bg-neutral-50 min-h-screen pb-[96px] relative">
      <div className="overflow-y-auto p-6">
        <div className="w-full flex justify-between items-center mb-10">
          <button
            onClick={() => router.back()}
            className="w-[44px] h-[44px] bg-white rounded-full border border-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h3 className="text-h3 font-bold text-neutral-900 mx-auto">Evaluation Result</h3>
        </div>

        <div className="flex justify-center mb-4">
          <CircularProgressBar value={historyData.score} />
        </div>

        {/* 3. METADATA DETAIL */}
        <div className="w-full text-center mb-8">
          <h2 className="text-h2 font-bold mb-2">{historyData.topic_title}</h2>

          {/* Info Tags Row */}
          <div className="flex items-center justify-center gap-4 text-[12px] font-medium text-neutral-500">
            {/* Level Tag */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-500">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.036-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.036-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>
              <span className="text-badge">{historyData.level} Level</span>
            </div>

            {/* Status Tag */}
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`size-4 ${isPassed ? "fill-green-500" : "fill-red-500"}`}>
                <circle cx="12" cy="12" r="10" />
                <path d="M8.5 12.5L11 15L16 9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-badge">Status {historyData.status}</span>
            </div>

            {/* Date Tag */}
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 text-primary-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <span className="text-badge">{formatDate(historyData.date)}</span>
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <section className="mb-6">
          <h3 className="text-h3 mb-1">AI Feedback</h3>
          <p className="text-body text-neutral-500 mb-4">A quick summary of your learning performance</p>
          <div className="p-4 rounded-lg bg-white border border-neutral-300 text-caption text-neutral-500">{historyData.ai_feedback}</div>
        </section>

        {/* Question Breakdown */}
        <section>
          <h3 className="text-h3 font-medium mb-1">Question Breakdown</h3>
          <p className="text-body text-neutral-700 mb-4">Your understanding level per question</p>
          <div className="space-y-4">
            {historyData.question_breakdown.map((q) => (
              <QuestionBreakdownAccordion
                key={q.question_id}
                title={`Question ${q.question_number}`}
                question={q.question}
                answer={q.answer}
                aiFeedback={q.ai_feedback}
                understandLabel={q.status}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-3xl z-40">
        {!isPassed && (
          <button
            type="button"
            onClick={() => {
              router.push(`/dashboard/material/${historyData.topic_id}?retry=true`);
            }}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg"
          >
            Retry Quiz
          </button>
        )}

        {isPassed && nextLevelTopic && (
          <button
            type="button"
            onClick={() => {
              const targetId = nextLevelTopic.topic_id || nextLevelTopic.custom_topic_id;

              router.push(`/dashboard/material/${targetId}`);
            }}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg"
          >
            Next Level
          </button>
        )}

        {isPassed && !nextLevelTopic && (
          <button type="button" onClick={() => router.push("/dashboard")} className="w-full px-4 py-3 bg-green-500 text-white rounded-lg">
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
