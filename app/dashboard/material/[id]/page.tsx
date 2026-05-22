"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import LearningMaterial from "@/components/LearningMaterial";
import { LearningResult } from "@/.next/types/learning";

interface SubTopic {
  sub_topic_id: string;
  title: string;
  materi_default: string;
}

interface TopicData {
  topic_id?: string;
  custom_topic_id?: string;
  title: string;
  difficulty: string;
  sub_topics: SubTopic[];
}

export default function MaterialPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const topicIdFromUrl = params.id as string;
  const isStaticQuery = searchParams.get("is_static") === "true";

  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);

  const [materialData, setMaterialData] = useState<LearningResult | null>(null);

  useEffect(() => {
    if (!topicIdFromUrl) return;

    const stored = localStorage.getItem("activeMaterial");
    if (stored) {
      try {
        setMaterialData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse activeMaterial", err);
      }
    }

    try {
      setLoading(true);
      let foundTopic: TopicData | null = null;

      if (isStaticQuery) {
        const localTopics = localStorage.getItem("topics");
        if (localTopics) {
          const parsedTopics = JSON.parse(localTopics);
          if (Array.isArray(parsedTopics)) {
            const match = parsedTopics.find((t: any) => t.topic_id === topicIdFromUrl);
            if (match) foundTopic = match;
          }
        }
      } else {
        const localCustomTopics = localStorage.getItem("custom_ai_topics");
        if (localCustomTopics) {
          const parsedCustomTopics = JSON.parse(localCustomTopics);
          if (Array.isArray(parsedCustomTopics)) {
            const match = parsedCustomTopics.find((t: any) => t.custom_topic_id === topicIdFromUrl);
            if (match) foundTopic = match;
          }
        }
      }

      if (foundTopic) {
        setTopic(foundTopic);
      }
    } catch (error) {
      console.error("Gagal mengambil data materi topik:", error);
    } finally {
      setLoading(false);
    }
  }, [topicIdFromUrl, isStaticQuery]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-sm">Loading materi...</div>;
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-6 text-center">
        <p className="text-neutral-600 mb-4">Maaf, materi pembahasan tidak ditemukan.</p>
        <button onClick={() => router.back()} className="text-primary-500 font-bold hover:underline">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-neutral-50 min-h-screen pb-[161px] relative">
      <div className="overflow-y-auto p-6">
        {/* Tombol Back */}
        <button
          onClick={() => router.back()}
          className="w-[44px] h-[44px] bg-white rounded-full border border-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Judul Utama Bab / Topik */}
        <div className="mb-8">
          <span className="text-xs font-bold text-primary-500 uppercase tracking-wider block mb-1">{topic.difficulty} Level</span>
          <h2 className="text-h2 font-black text-neutral-900 leading-tight">{topic.title}</h2>
        </div>

        {/* Looping Seluruh Konten Sub-Topik (Title + Teks Materi) */}
        <div className="space-y-8">
          {topic.sub_topics && topic.sub_topics.length > 0 ? (
            topic.sub_topics.map((sub: SubTopic, index: number) => (
              <div key={sub.sub_topic_id} className="space-y-3">
                {/* Judul Sub-Topik dengan penanda angka urutan */}
                <h4 className="text-body-lg font-bold text-neutral-800">
                  {index + 1}. {sub.title}
                </h4>

                {/* Box Konten Teks Materi */}
                <div className="text-body text-neutral-600 leading-relaxed bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm whitespace-pre-line">
                  {sub.materi_default}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-neutral-400 py-6">Belum ada materi tertulis untuk topik ini.</div>
          )}
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-3xl z-40 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-neutral-100">
        <Link
          href={`/dashboard/quiz/${topic.topic_id || topic.custom_topic_id}`}
          className="w-full px-4 py-3 text-btn-lg bg-primary-500 flex items-center justify-center text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary-500/10 text-center"
        >
          Start Feynman Test
        </Link>
      </div>
    </div>
  );
}
