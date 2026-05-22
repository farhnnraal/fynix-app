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
        const matchedCategory = categoriesArray.find((cat: any) => cat.id === idFromUrl || cat.category_id === idFromUrl);
        namaKategori = matchedCategory ? matchedCategory.name : "Static Category";
      }
      // Kondisi B: Jika tidak ada query is_static (Berarti Data AI Kustom)
      else {
        const aiRaw = localStorage.getItem("custom_ai_topics") || "[]";
        const aiArray = JSON.parse(aiRaw);

        if (Array.isArray(aiArray)) {
          // Filter semua TOPIC yang memiliki custom_category_id yang sama
          matchedTopics = aiArray.filter((item) => item.custom_category?.custom_category_id === idFromUrl);
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
