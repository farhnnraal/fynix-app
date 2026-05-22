import TopicCard from "@/components/ui/TopicCard";
import Link from "next/link";

export default function TopicPage() {
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
          <TopicCard imageUrl="/images/mathematics.jpg" name="Mathematics" total={7} />
          <TopicCard imageUrl="/images/science.jpg" name="Science" total={7} />
          <TopicCard imageUrl="/images/history.jpg" name="History" total={7} />
          <TopicCard imageUrl="/images/technology.jpg" name="Technology" total={7} />
          <TopicCard imageUrl="/images/sport.jpg" name="Sport" total={7} />
          <TopicCard imageUrl="/images/art-and-culture.jpg" name="Art & Culture" total={7} />
          <TopicCard imageUrl="/images/economics.jpg" name="Economics" total={7} />
          <TopicCard imageUrl="/images/social-science.jpg" name="Social Science" total={7} />
          <TopicCard imageUrl="/images/health-and-biology.jpg" name="Health & Biology" total={7} />
          <TopicCard imageUrl="/images/language.jpg" name="Language" total={7} />
          <TopicCard imageUrl="/images/philosophy.jpg" name="Philosophy" total={7} />
          <TopicCard imageUrl="/images/astronomy.jpg" name="astronomy" total={7} />
        </div>
      </div>
    </div>
  );
}
