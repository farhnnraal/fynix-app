"use client";

import HistoryCard from "@/components/ui/HistoryCard";
import TopicCard from "@/components/ui/TopicCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="bg-primary-50 h-[340px] flex flex-col items-center text-center pt-12">
        <h3 className="text-h3">Welcome, Gemah Ghozali!</h3>
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
              <label htmlFor="pdf-upload" className="block text-center cursor-pointer bg-white px-3 py-2 rounded-lg w-full text-black text-btn border border-neutral-300">
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
            <TopicCard imageUrl="/images/mathematics.jpg" name="Mathematics" total={7} />
            <TopicCard imageUrl="/images/science.jpg" name="Science" total={7} />
            <TopicCard imageUrl="/images/history.jpg" name="History" total={7} />
            <TopicCard imageUrl="/images/technology.jpg" name="Technology" total={7} />
            <TopicCard imageUrl="/images/sport.jpg" name="Sport" total={7} />
            <TopicCard imageUrl="/images/art-and-culture.jpg" name="Art & Culture" total={7} />
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
            <HistoryCard id={1} title="Artificial Intelligence" date="12 Maret 2026, 13:00" status="Passed" level="Advance" score={90} />
            <HistoryCard id={2} title="Calculus" date="26 April 2026, 18:00" status="Failed" level="Beginner" score={30} />
            <HistoryCard id={3} title="Music Rock History" date="10 Februari 2026, 10:00" status="Passed" level="Advanced" score={90} />
          </div>
        </section>
      </div>
    </div>
  );
}
