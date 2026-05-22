"use client";

import { useState, useEffect } from "react";
import HistoryCard from "@/components/ui/HistoryCard";

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [histories, setHistories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data riil learning_histories dari localStorage
    const localHistories = localStorage.getItem("learning_histories");
    const localTopics = localStorage.getItem("topics");
    const localCustomTopics = localStorage.getItem("custom_ai_topics");

    if (localHistories) {
      try {
        const parsedHistories = JSON.parse(localHistories);
        const topics = localTopics ? JSON.parse(localTopics) : [];
        const customTopics = localCustomTopics ? JSON.parse(localCustomTopics) : [];

        // Gabungkan data history dengan metadata judul dan level dari tabel master topic
        const enrichedHistories = parsedHistories.map((history: any) => {
          const isCustom = history.is_custom_topic;
          const sourceArray = isCustom ? customTopics : topics;
          
          // Cari judul dan difficulty asli berdasarkan topic_id
          const matchedTopic = sourceArray.find((t: any) => 
            isCustom ? t.custom_topic_id === history.topic_id : t.topic_id === history.topic_id
          );

          // Konversi nilai score menjadi status kelulusan untuk UI Card
          const finalScore = history.score || 0;
          const statusResult = finalScore >= 75 ? "Passed" : "Failed";

          return {
            // Gunakan history_id sebagai key unik utama untuk routing detail
            id: history.history_id, 
            title: matchedTopic ? matchedTopic.title : (history.title || "Unknown Topic"),
            date: history.created_at ? formatDisplayDate(history.created_at) : "No Date",
            status: statusResult as "Passed" | "Failed",
            level: matchedTopic ? `${matchedTopic.difficulty} Level` : "General Level",
            score: finalScore,
          };
        });

        // Urutkan berdasarkan tanggal terbaru (descending) agar riwayat paling baru muncul di atas
        enrichedHistories.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setHistories(enrichedHistories);
      } catch (error) {
        console.error("Gagal memproses data history:", error);
      }
    }
    setLoading(false);
  }, []);

  // Fungsi pembantu untuk merapikan format tanggal ISO ke teks display UI
  const formatDisplayDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      const formattedDate = dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const formattedTime = dateObj.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }).replace(".", ":");
      
      return `${formattedDate}, ${formattedTime}`;
    } catch {
      return dateString;
    }
  };

  // Filter data berdasarkan text yang diketik user di kolom pencarian
  const filteredHistories = histories.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-4 p-6 mb-20">
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-h3 font-bold text-neutral-900">Learning History</h3>
        <p className="text-body text-neutral-500">List of all your learning history.</p>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full flex gap-3 items-stretch">
        <div className="flex-1 bg-white border border-neutral-200 rounded-lg p-[12px] flex items-center gap-3 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 text-neutral-800">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input 
            type="text" 
            placeholder="Search topic here..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-transparent text-[14px] text-neutral-800 placeholder-neutral-400 outline-none" 
          />
        </div>
      </div>

      {/* LIST HISTORY CARD */}
      <div className="w-full flex flex-col gap-4">
        {loading ? (
          <div className="text-center text-sm text-neutral-400 py-10">Loading histories...</div>
        ) : filteredHistories.length > 0 ? (
          filteredHistories.map((item) => (
            <HistoryCard 
              key={item.id} 
              id={item.id}
              title={item.title} 
              date={item.date} 
              status={item.status} 
              level={item.level} 
              score={item.score} 
            />
          ))
        ) : (
          <div className="text-center text-sm text-neutral-500 bg-neutral-100/50 rounded-xl py-12 border border-dashed border-neutral-200">
            {searchQuery ? "No history matches your search." : "You don't have any learning history yet."}
          </div>
        )}
      </div>
    </div>
  );
}
