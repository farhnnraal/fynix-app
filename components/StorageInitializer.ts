"use client";

import { useEffect } from "react";

interface StorageInitializerProps {
  initialData: {
    users: any[];
    categories: any[];
    topics: any[];
    custom_ai_topics: any[];
    learning_histories: any[];
  };
}

export default function StorageInitializer({ initialData }: StorageInitializerProps) {
  useEffect(() => {
    // Daftar key yang ingin kita periksa dan isi di LocalStorage
    const storageKeys = [
      { key: "users", data: initialData.users },
      { key: "categories", data: initialData.categories },
      { key: "topics", data: initialData.topics },
      { key: "custom_ai_topics", data: initialData.custom_ai_topics },
      { key: "learning_histories", data: initialData.learning_histories },
    ];

    storageKeys.forEach(({ key, data }) => {
      const existingData = localStorage.getItem(key);

      if (!existingData) {
        localStorage.setItem(key, JSON.stringify(data || []));
        console.log(`[FennyTech Seed] Berhasil menyuntikkan data untuk key: ${key}`);
      } else {
        console.log(`[FennyTech Seed] Key ${key} sudah terisi. Skip seeding.`);
      }
    });
  }, [initialData]);

  return null;
}