// // app/dashboard/(main)/hooks/useTopicDetail.ts
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// // 1. SubTopic shared oleh kedua struktur
// interface SubTopic {
//   sub_topic_id: string;
//   title: string;
//   materi_default: string;
// }

// // 2. Struktur Data Statis (dari key "topics")
// interface StaticTopicData {
//   topic_id: string;
//   category_id: string;
//   title: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   sub_topics: SubTopic[];
// }

// // 3. Struktur Data AI (dari key "custom_ai_topics")
// interface CustomAiTopicData {
//   custom_topic_id: string;
//   user_id: string;
//   user_prompt_request: string;
//   created_at: string;
//   custom_category: {
//     custom_category_id: string;
//     name: string;
//   };
//   title: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   sub_topics: SubTopic[];
// }

// // Variabel tunggal yang mendukung kedua tipe struktur data di atas
// type UnifiedTopicData = StaticTopicData | CustomAiTopicData;

// export function useTopicDetail() {
//   const params = useParams();
//   const categoryIdFromUrl = params.id as string;
//   const topicIdFromUrl = params.id as string;

//   // Menggunakan UnifiedTopicData agar state bisa menampung statis maupun kustom
//   const [topicDetail, setTopicDetail] = useState<UnifiedTopicData | null>(null);
//   const [topicsList, setTopicsList] = useState<any[]>([]);
//   const [isStatic, setIsStatic] = useState<boolean>(false);
//   const [categoryName, setCategoryName] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!topicIdFromUrl) return;

//     try {
//       setLoading(true);
//       let dataMurni: any = null;
//       let statusStatis = false;
//       let namaKategoriHasilCari = "";

//       // 1. Cek di storage "topics" (Statis)
//       const staticRaw = localStorage.getItem("topics");
//       if (staticRaw) {
//         const staticArray = JSON.parse(staticRaw);
//         if (Array.isArray(staticArray)) {
//           const match = staticArray.find((item) => item.category_id == topicIdFromUrl);
//           console.log(staticRaw);
//           if (match) {
//             dataMurni = match;
//             statusStatis = true;

//             const categoriesRaw = localStorage.getItem("categories");
//             if (categoriesRaw) {
//               const categoriesArray = JSON.parse(categoriesRaw);
//               const matchedCategory = categoriesArray.find(
//                 (cat: any) => cat.id === match.category_id || cat.category_id === match.category_id
//               );
//               namaKategoriHasilCari = matchedCategory ? matchedCategory.name : "Statis Category";
//             } else {
//               namaKategoriHasilCari = "Statis Category";
//             }
//           }
//         }
//       }

//       // 2. Jika tidak ada di statis, cek di "custom_ai_topics" (AI)
//       if (!dataMurni) {
//         const aiRaw = localStorage.getItem("custom_ai_topics");
//         if (aiRaw) {
//           const aiArray = JSON.parse(aiRaw);
//           if (Array.isArray(aiArray)) {
//             const match = aiArray.find((item) => item.custom_category.custom_category_id === topicIdFromUrl);
//             if (match) {
//               dataMurni = match;
//               statusStatis = false;
//               namaKategoriHasilCari = match.custom_category?.name || "AI Generated";
//             }
//           }
//         }
//       }

//       // 3. Validasi & Set State masing-masing secara terpisah
//       if (!dataMurni) {
//         throw new Error("Maaf, detail topik tidak ditemukan.");
//       }

//       setTopicDetail(dataMurni); // Murni objek asli dari storage
//       setIsStatic(statusStatis); // Status disimpan di state luar biasa
//       setCategoryName(namaKategoriHasilCari);
//       setError(null);
//     } catch (err: any) {
//       console.error("Error fetching data:", err);
//       setError(err.message || "Gagal memuat data.");
//     } finally {
//       setLoading(false);
//     }
//   }, [topicIdFromUrl]);

//   return { topicsList,topicDetail, loading, error, isStatic, categoryName };
// }
// app/dashboard/(main)/hooks/useTopicDetail.ts
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useTopicDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const idFromUrl = params.id as string; // Ini adalah Category ID (baik statis maupun AI)
  const isStaticQuery = searchParams.get("is_static") === "true"; // Membaca ?is_static=true

  const [topicsList, setTopicsList] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idFromUrl) return;

    try {
      setLoading(true);
      let matchedTopics: any[] = [];
      let namaKategori = "";

      // Kondisi A: Jika URL mengandung ?is_static=true
      if (isStaticQuery) {
        const staticRaw = localStorage.getItem("topics") || "[]";
        const staticArray = JSON.parse(staticRaw);
        
        if (Array.isArray(staticArray)) {
          matchedTopics = staticArray.filter((item) => item.category_id === idFromUrl);
        }

        // Cari nama kategori dari master categories data statis
        const categoriesRaw = localStorage.getItem("categories") || "[]";
        const categoriesArray = JSON.parse(categoriesRaw);
        const matchedCategory = categoriesArray.find(
          (cat: any) => cat.id === idFromUrl || cat.category_id === idFromUrl
        );
        namaKategori = matchedCategory ? matchedCategory.name : "Static Category";

      } 
      // Kondisi B: Jika tidak ada query is_static (Berarti Data AI Kustom)
      else {
        const aiRaw = localStorage.getItem("custom_ai_topics") || "[]";
        const aiArray = JSON.parse(aiRaw);

        if (Array.isArray(aiArray)) {
          // Filter semua TOPIC yang memiliki custom_category_id yang sama
          matchedTopics = aiArray.filter(
            (item) => item.custom_category?.custom_category_id === idFromUrl
          );
        }

        if (matchedTopics.length > 0) {
          namaKategori = matchedTopics[0].custom_category?.name || "AI Generated Mechanics";
        } else {
          namaKategori = "AI Category";
        }
      }

      if (matchedTopics.length === 0) {
        throw new Error("Tidak ada kumpulan topik ditemukan untuk kategori ini.");
      }

      setTopicsList(matchedTopics);
      setCategoryName(namaKategori);
      setError(null);
    } catch (err: any) {
      console.error("Gagal memuat topics list:", err);
      setError(err.message || "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, [idFromUrl, isStaticQuery]);

  return { topicsList, categoryName, loading, error, isStatic: isStaticQuery };
}