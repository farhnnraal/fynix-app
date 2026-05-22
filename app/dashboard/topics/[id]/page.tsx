"use client";

import TopicSelection from "@/components/ui/TopicSelection";
import { useTopicDetail } from "@/hooks/useTopicDetails";
import Image from "next/image";
import Link from "next/link";

export default function TopicDetailsPage() {
  const { topicDetail, isStatic, loading, error } = useTopicDetail();

  if (loading) return <p>Loading...</p>;
  if (error || !topicDetail) return <p>Error: {error}</p>;

  // const data = isStatic ? {} : {};

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold">{topicDetail.custom_category.name}</h3>

      {/* Gunakan variabel isStatic terpisah untuk menentukan key mana yang dibaca */}
      <div className="mt-4">
        {isStatic ? (
          <div>
            <p>Ini Data Statis</p>
            <p>ID: {topicDetail.topic_id}</p>
            <p>Category ID: {topicDetail.category_id}</p>
          </div>
        ) : (
          <div>
            <p>Ini Data AI Kustom</p>
            <p>ID: {topicDetail.custom_topic_id}</p> {/* Membaca key milik custom_ai_topics */}
            <p>Prompt: {topicDetail.user_prompt_request}</p>
          </div>
        )}
      </div>
    </div>
  );

  // 4. Render UI Utama menggunakan data dinamis dari 'topicDetail'
  // return (
  //   <div className="w-full h-dvh flex flex-col max-w-[390px] mx-auto bg-neutral-50 min-h-screen relative">
  //     <div className="overflow-y-auto p-6">
  //       <Link
  //         href="/dashboard"
  //         className="w-[38px] h-[38px] bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 shadow-sm self-start mb-6"
  //       >
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
  //           <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  //         </svg>
  //       </Link>

  //       <div className="p-4 rounded-2xl bg-primary-500 flex items-center gap-4 mb-4">
  //         <Image src="/images/mathematics.jpg" alt="mathematics" width={80} height={80} className="rounded-full" />

  //         <div className="space-y-1">
  //           <h3 className="text-h3 text-white">Mathematics</h3>

  //           <p className="text-caption text-neutral-200">Everything that are related to mathematics knowledge</p>
  //         </div>
  //       </div>

  //       {/* Subtopic Selections */}
  //       <div className="space-y-4">
  //         <TopicSelection id="top_math_01" difficulty="Easy" title="Arithmetics" />
  //       </div>
  //     </div>
  //   </div>
  // );
}
