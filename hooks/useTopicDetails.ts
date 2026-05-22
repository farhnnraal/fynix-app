// app/dashboard/(main)/hooks/useTopicDetail.ts
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 1. SubTopic shared oleh kedua struktur
interface SubTopic {
  sub_topic_id: string;
  title: string;
  materi_default: string;
}

// 2. Struktur Data Statis (dari key "topics")
interface StaticTopicData {
  topic_id: string;
  category_id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  sub_topics: SubTopic[];
}

// 3. Struktur Data AI (dari key "custom_ai_topics")
interface CustomAiTopicData {
  custom_topic_id: string;
  user_id: string;
  user_prompt_request: string;
  created_at: string;
  custom_category: {
    custom_category_id: string;
    name: string;
  };
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  sub_topics: SubTopic[];
}

// Variabel tunggal yang mendukung kedua tipe struktur data di atas
type UnifiedTopicData = StaticTopicData | CustomAiTopicData;

export function useTopicDetail() {
  const params = useParams();
  const topicIdFromUrl = params.id as string;

  // Menggunakan UnifiedTopicData agar state bisa menampung statis maupun kustom
  const [topicDetail, setTopicDetail] = useState<UnifiedTopicData | null>(null);
  const [isStatic, setIsStatic] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicIdFromUrl) return;

    try {
      setLoading(true);
      let dataMurni: any = null;
      let statusStatis = false;

      // 1. Cek di storage "topics" (Statis)
      const staticRaw = localStorage.getItem("topics");
      if (staticRaw) {
        const staticArray = JSON.parse(staticRaw);
        if (Array.isArray(staticArray)) {
          const match = staticArray.find((item) => item.category_id == topicIdFromUrl);
          console.log(staticRaw);
          if (match) {
            dataMurni = match;
            statusStatis = true;
          }
        }
      }

      // 2. Jika tidak ada di statis, cek di "custom_ai_topics" (AI)
      if (!dataMurni) {
        const aiRaw = localStorage.getItem("custom_ai_topics");
        if (aiRaw) {
          const aiArray = JSON.parse(aiRaw);
          if (Array.isArray(aiArray)) {
            const match = aiArray.find((item) => item.custom_category.custom_category_id === topicIdFromUrl);
            if (match) {
              dataMurni = match;
              statusStatis = false;
            }
          }
        }
      }

      // 3. Validasi & Set State masing-masing secara terpisah
      if (!dataMurni) {
        throw new Error("Maaf, detail topik tidak ditemukan.");
      }

      setTopicDetail(dataMurni); // Murni objek asli dari storage
      setIsStatic(statusStatis); // Status disimpan di state luar biasa
      setError(null);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, [topicIdFromUrl]);

  return { topicDetail, loading, error, isStatic };
}
