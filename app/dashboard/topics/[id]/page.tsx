"use client";

import Link from "next/link";
import { useTopicDetail } from "@/hooks/useTopicDetails"; // Sesuaikan path hook-mu
import TopicSelection from "@/components/ui/TopicSelection"; // Sesuaikan path component-mu

export default function TopicsPage() {
  const { topicsList, categoryName, loading, error, isStatic } = useTopicDetail();

  if (loading) return <div className="p-6 text-center text-sm text-neutral-400">Loading topics...</div>;
  if (error) return <div className="p-6 text-center text-sm text-destructive-500">{error}</div>;

  return (
    <div className="w-full h-dvh flex flex-col max-w-[390px] mx-auto bg-neutral-50 min-h-screen relative">
      <div className="overflow-y-auto p-6 pb-24">
        {/* Tombol Back ke Dashboard */}
        <Link
          href="/dashboard"
          className="w-[38px] h-[38px] bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 shadow-sm self-start mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        {/* Header Banner Kategori */}
        <div className="p-4 rounded-2xl bg-primary-500 flex items-center gap-4 mb-6 shadow-sm">
          <div className="w-[64px] h-[64px] relative bg-white/20 rounded-full flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-2xl text-white font-bold">
              {categoryName ? categoryName.charAt(0) : "C"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Menampilkan Nama Kategori */}
            <h3 className="text-lg font-bold text-white truncate">{categoryName}</h3>
            
            <p className="text-xs text-neutral-100 line-clamp-2 mt-0.5">
              {isStatic 
                ? `Kumpulan silabus materi resmi bidang ${categoryName}.`
                : `Materi AI kustom hasil generate untuk kelas ${categoryName}.`
              }
            </p>
          </div>
        </div>

        {/* Section List Kumpulan Topics */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Available Topics ({topicsList.length})
          </p>
          
          {topicsList.map((topic: any) => {
            // Ambil ID topiknya (bisa topic_id untuk statis, atau custom_topic_id untuk AI)
            const currentTopicId = topic.topic_id || topic.custom_topic_id;

            return (
              <TopicSelection 
                key={currentTopicId}
                id={!isStatic ? currentTopicId : currentTopicId + "?is_static=true"}
                difficulty={topic.difficulty} 
                title={topic.title} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}