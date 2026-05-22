"use client";

import { useEffect, useState } from "react";
import TopicCard from "@/components/ui/TopicCard";
import Link from "next/link";

export default function TopicPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 1. Ambil data mentah dari localStorage
    const localCategories = localStorage.getItem("categories");
    const localTopics = localStorage.getItem("topics");
    
    if (localCategories) {
      try {
        const parsedCategories = JSON.parse(localCategories);
        const parsedTopics = localTopics ? JSON.parse(localTopics) : [];
        
        // 2. Olah SEMUA data tanpa menggunakan .slice()
        const categoriesWithCount = parsedCategories.map((cat: any) => {
          // Hitung jumlah topik yang sesuai dengan category_id saat ini
          const matchingTopics = parsedTopics.filter(
            (topic: any) => topic.category_id === cat.category_id
          );
          
          return {
            ...cat,
            totalTopicsCount: matchingTopics.length
          };
        });

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error("Gagal memproses data categories atau topics:", error);
      }
    }

    
  }, []);
  return (
    <div className="w-full flex flex-col items-center bg-neutral-50 min-h-screen relative">
      <div className="overflow-y-auto p-6">
        <div className="flex gap-4">
          <Link href="/dashboard" className="w-[38px] h-[38px] bg-white rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 shadow-sm self-start mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
        </div>
        <h3 className="text-h3 font-medium text-neutral-900 mb-2">Topic Categories</h3>
        <p className="text-body text-neutral-700 mb-4">Explore various topics and find out what to learn</p>
        <div className="grid grid-cols-2 gap-4">
          {categories.length > 0 ? (
            // 3. Render seluruh data kategori yang ada
            categories.map((cat) => {
              console.log(cat);
              // Bikin huruf kapital di awal kata (contoh: "astronomy" -> "Astronomy")
              const formattedName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
              
              return (
                <TopicCard
                  id={cat.category_id + '?is_static=true'}
                  imageUrl={`/images/${cat.image}`}
                  name={formattedName}
                  total={cat.totalTopicsCount || 0} // Otomatis dinamis sesuai hitungan di atas
                />
              );
            })
          ) : (
            <p className="col-span-2 text-center text-gray-500">Tidak ada kategori ditemukan</p>
          )}
        </div>
      </div>
    </div>
  );
}
