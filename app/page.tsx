import Image from "next/image";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="w-full max-w-[390px] mx-auto bg-neutral-50 h-dvh p-6 flex flex-col justify-between items-center box-border">
      <div className="w-full flex flex-col gap-3 mt-8">
        <h1 className="text-h3 text-neutral-900 font-medium leading-tight">Learn Faster, Master Longer</h1>
        <p className="text-body text-neutral-700 leading-relaxed">Test your understanding by explaining with your own words with Fenyman technique. ✨</p>
      </div>
      <Image src="/images/mascot-onboarding.png" alt="Fenyman AI Mascot Onboarding" width={342} height={342} priority className="w-full h-auto object-contain" />
      <Link href="/register" className="bg-primary-500 text-white text-body p-[16px] rounded-full flex items-center justify-center gap-2 w-full font-medium">
        <span>Get Started</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
