"use client";

import { useEffect, useState } from "react";

import HistoryCard from "@/components/ui/HistoryCard";
import TopicCard from "@/components/ui/TopicCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const localCategories = localStorage.getItem("categories");
    const rawData = localStorage.getItem("currentUser");
    const localTopics = localStorage.getItem("topics");
    const localHistories = localStorage.getItem("learning_histories");

    let currentUserId = "";

    if (rawData) {
      try {
        const user = JSON.parse(rawData);
        if (user && user.username) {
          setName(user.username);
          currentUserId = user.user_id;
        }
      } catch (error) {
        console.error("Gagal membaca objek currentUser:", error);
      }
    }

    if (localCategories) {
      try {
        const parsedCategories = JSON.parse(localCategories);
        const parsedTopics = localTopics ? JSON.parse(localTopics) : [];

        const topSixCategories = parsedCategories.slice(0, 6);

        const categoriesWithCount = topSixCategories.map((cat: any) => {
          const matchingTopics = parsedTopics.filter((topic: any) => topic.category_id === cat.category_id);

          return {
            ...cat,
            totalTopicsCount: matchingTopics.length,
          };
        });

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error("Gagal memproses data categories atau topics:", error);
      }
    }

    if (localHistories && currentUserId) {
      try {
        const parsedHistories = JSON.parse(localHistories);

        const userHistories = parsedHistories.filter((item: any) => item.user_id === currentUserId);

        const topThreeHistories = userHistories.slice(0, 3);

        console.log(topThreeHistories);

        setHistories(topThreeHistories);
      } catch (error) {
        console.error("Gagal memproses data learning_histories:", error);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };
  return (
    <div className="w-full">
      <div className="bg-primary-50 h-[340px] flex flex-col items-center text-center pt-12">
        <h3 className="text-h3">Welcome, {name || ""}!</h3>
        <p className="text-body text-neutral-500">What topic do you want to explore today?</p>
      </div>

      {/* Main Container */}
      <div className="bg-neutral-50 px-6 pb-6 pt-[169px] relative">
        {/* Floating Form */}
        <div className="absolute -top-54 left-6 right-6">
          <div className="relative h-[132px]">
            <Image src="/images/mascot-home.png" alt="Fenyman AI Mascot Home" fill priority className="object-contain" />
          </div>
          <form className="space-y-4 p-4 rounded-3xl border border-neutral-300 bg-white">
            <div className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3">
              <label className="block text-label">Learning Topic</label>
              <input type="text" className="w-full text-body" placeholder="Type topic that you want to learn here..." />
            </div>
            <button type="submit" className="cursor-pointer bg-primary-500 px-3 py-2 rounded-lg w-full text-white text-btn">
              Start Learning Now
            </button>
            <div className="w-full">
              <input type="file" id="pdf-upload" accept=".pdf" className="hidden" />
              <label
                htmlFor="pdf-upload"
                className="block text-center cursor-pointer bg-white px-3 py-2 rounded-lg w-full text-black text-btn border border-neutral-300"
              >
                Use PDF File
              </label>
            </div>
          </form>
        </div>

        {/* Topic Suggestions Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900">Topic Suggestions</h2>
            <Link href="/dashboard/topics" className="text-sm font-bold text-primary-500 hover:underline">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.length > 0 ? (
              categories.map((cat) => {
                return (
                  <TopicCard
                    key={cat.category_id}
                    id={cat.category_id}
                    imageUrl={`/images/${cat.image}`}
                    name={cat.name}
                    total={cat.totalTopicsCount || 0}
                  />
                );
              })
            ) : (
              <p className="col-span-2 text-center text-gray-500"></p>
            )}
          </div>
        </section>

        {/* Learning History Section */}
        <section className="space-y-4 mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900">Learning History</h2>
            <Link href="/dashboard/history" className="text-sm font-bold text-primary-500 hover:underline">
              See All
            </Link>
          </div>

          <div className="space-y-4">
            {histories.length > 0 ? (
              histories.map((hist) => (
                <HistoryCard
                  key={hist.history_id}
                  id={hist.history_id}
                  title={hist.topic_title}
                  date={formatDate(hist.date)}
                  status={hist.status}
                  level={hist.level}
                  score={hist.score}
                />
              ))
            ) : (
              // Tampilan jika user baru mendaftar dan belum punya riwayat belajar sama sekali
              <p className="text-center py-4 text-gray-500 text-sm">Kamu belum memulai quiz apa pun.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
