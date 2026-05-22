"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, LayoutGridIcon, X, Send, Loader2 } from "lucide-react";
import HeaderElement from "@/components/HeaderElement";
import ButtonElement from "@/components/ButtonElement";
import { useQuizTopic } from "@/hooks/useQuizTopic";
import { useSummaryQuiz } from "@/hooks/useSummaryQuiz";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: "ai" | "user";
  text: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AIAvatar() {
  return (
    <div aria-hidden="true" className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
      <img src="/images/fynix-ai.jpeg" alt="" className="w-full h-full object-cover rounded-full" />
    </div>
  );
}

function AiBubble({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 items-start max-w-[75%] animate-[fadeUp_0.3s_ease]" role="listitem">
      <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-4 w-full flex flex-col gap-4">
        <p className="text-lg font-normal leading-[1.5] text-neutral-700 whitespace-pre-wrap break-words">{text}</p>
        <div className="flex items-center gap-2">
          <AIAvatar />
        </div>
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2 items-end self-end max-w-[80%] animate-[fadeUp_0.3s_ease]" role="listitem">
      <div className="bg-violet-50 border border-violet-300 rounded-3xl p-4 w-full">
        <p className="text-lg font-normal leading-[1.5] text-neutral-700 whitespace-pre-wrap break-words">{text}</p>
      </div>
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-base font-normal text-neutral-500">Question {current + 1}</p>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={[
              "h-[6px] rounded-full transition-all duration-300",
              i === current ? "w-3 bg-violet-600" : i < current ? "w-[6px] bg-violet-300" : "w-[6px] bg-neutral-300",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Loading / Error screens ─────────────────────────────────────────────────
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
      <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
      <p className="text-base text-neutral-500 text-center">{message}</p>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-4xl">😕</p>
      <p className="text-base text-neutral-500">{message}</p>
    </div>
  );
}

// ─── Congratulations Screen ───────────────────────────────────────────────────
function CongratsScreen({ topicTitle, isSubmitting, onViewResult }: { topicTitle: string; isSubmitting: boolean; onViewResult: () => void }) {
  return (
    <div className="w-full h-full bg-violet-600 flex items-center justify-center p-8 animate-[fadeUp_0.5s_ease]">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold text-white leading-tight">Congratulations</h1>
        <p className="text-base font-normal text-white/85 leading-relaxed">
          Kamu berhasil menyelesaikan semua pertanyaan essay tentang <span className="font-semibold">{topicTitle}</span>. Lihat hasil evaluasi AI kamu
          sekarang!
        </p>
        <button
          onClick={onViewResult}
          disabled={isSubmitting}
          className="mt-2 px-7 py-3 rounded-full bg-white/20 border border-white/50 text-white text-base font-medium cursor-pointer transition-colors duration-200 hover:bg-white/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Evaluating..." : "View Result"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const params = useParams();
  const topicId = params.id as string;
  const router = useRouter();

  // ── Data hooks ──────────────────────────────────────────────────────────────
  const { topic, status: topicStatus, error: topicError } = useQuizTopic(topicId);
  const { submitSummary, isLoading: isSubmitting, error: summaryError } = useSummaryQuiz();

  // ── Quiz state ──────────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnswered, setIsAnswered] = useState(false); // jawaban soal ini sudah dikirim
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isDone, setIsDone] = useState(false); // semua soal selesai

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Init saat topic berhasil di-load ────────────────────────────────────────
  useEffect(() => {
    if (topic) {
      setAnswers(Array(topic.questions.length).fill(""));
      setMessages([{ id: 1, role: "ai", text: topic.questions[0].question as string }]);
    }
  }, [topic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isAnswered && !isDone) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentStep, isAnswered, isDone]);

  if (!topic) {
    // Masih loading atau error
  }

  // ── Derived ─────────────────────────────────────────────────────────────────
  const questions = topic?.questions ?? [];
  const isLastQuestion = currentStep === questions.length - 1;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isAnswered) return;

    const newAnswers = [...answers];
    newAnswers[currentStep] = trimmed;
    setAnswers(newAnswers);

    setMessages((prev) => [...prev, { id: prev.length + 1, role: "user", text: trimmed }]);
    setInputValue("");
    setIsAnswered(true);

    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsMultiLine(false);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsDone(true);
      return;
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMessages([{ id: 1, role: "ai", text: questions[nextStep].question as string }]);
    setInputValue("");
    setIsAnswered(false);
  };

  const handleViewResult = async () => {
    if (!topic) return;

    const newHistory = await submitSummary({
      topicId: topic.custom_topic_id,
      topicTitle: topic.title,
      userId: topic.user_id,
      isCustomTopic: true,
      level: topic.difficulty,
      answerList: questions.map((q, i) => ({
        question: q.question as string,
        answer: answers[i] ?? "",
      })),
    });

    if (!newHistory) return; // error sudah ditangani hook, UI tampilkan summaryError

    // Navigasi ke halaman result dengan history_id sebagai query param
    router.push(`/dashboard/history/${newHistory.history_id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const target = e.target;
    target.style.height = "auto";
    target.style.height = Math.min(target.scrollHeight, 140) + "px";
    const lineHeight = parseFloat(getComputedStyle(target).lineHeight) || 27;
    setIsMultiLine(target.scrollHeight > lineHeight + 1);
  };

  // ── Render: loading / error ─────────────────────────────────────────────────
  if (topicStatus === "loading" || topicStatus === "idle") {
    return (
      <div className="bg-neutral-50 flex justify-center">
        <style>{keyframesCSS}</style>
        <div className="max-w-[390px] w-full mx-auto h-dvh">
          <LoadingScreen message="Memuat pertanyaan..." />
        </div>
      </div>
    );
  }

  if (topicStatus === "not_found" || topicStatus === "error" || !topic) {
    return (
      <div className="bg-neutral-50 flex justify-center">
        <style>{keyframesCSS}</style>
        <div className="max-w-[390px] w-full mx-auto h-dvh">
          <ErrorScreen message={topicError ?? "Terjadi kesalahan."} />
        </div>
      </div>
    );
  }

  // ── Render: congratulations ─────────────────────────────────────────────────
  if (isDone) {
    return (
      <div className="bg-neutral-50 flex justify-center">
        <style>{keyframesCSS}</style>
        <div className="max-w-[390px] w-full mx-auto h-dvh">
          {summaryError && (
            <div className="absolute top-4 left-4 right-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 z-10">
              {summaryError}
            </div>
          )}
          <CongratsScreen topicTitle={topic.title} isSubmitting={isSubmitting} onViewResult={handleViewResult} />
        </div>
      </div>
    );
  }

  // ── Render: quiz ────────────────────────────────────────────────────────────
  return (
    <div className="bg-neutral-50 flex justify-center">
      <style>{keyframesCSS}</style>

      <div className="max-w-[390px] w-full mx-auto h-dvh flex flex-col justify-between gap-4 p-4 box-border">
        {/* Header */}
        <HeaderElement
          elements={
            <>
              {isAnswered ? (
                <button
                  onClick={() => setIsAnswered(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-[10px] border border-neutral-300 bg-neutral-50 flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-violet-50 hover:border-violet-300"
                >
                  <X className="w-5 h-5 text-neutral-700" />
                </button>
              ) : (
                <ButtonElement icon={<ArrowLeft className="w-5 h-5" />} destination="/" />
              )}

              <ProgressDots total={questions.length} current={currentStep} />

              <ButtonElement icon={<LayoutGridIcon className="w-5 h-5" />} destination="/" />
            </>
          }
        />

        {/* Chat area */}
        <main className="flex-1 overflow-y-auto flex flex-col gap-4 scroll-smooth" role="log" aria-live="polite" aria-label="Chat messages">
          <ul role="list" className="contents">
            {messages.map((msg) => (msg.role === "ai" ? <AiBubble key={msg.id} text={msg.text} /> : <UserBubble key={msg.id} text={msg.text} />))}
          </ul>
          <div ref={messagesEndRef} />
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0" role="contentinfo">
          <div className="flex flex-col items-end gap-2.5">
            {/* Input — visible sebelum jawab */}
            {!isAnswered && (
              <div
                className={[
                  "flex w-full justify-center gap-4 bg-white/10 border-[1.5px] border-violet-600 px-4 py-2",
                  "shadow-[0_0_24px_rgba(98,68,252,0.3)] backdrop-blur-xl backdrop-saturate-200",
                  "transition-all duration-300 focus-within:shadow-[0_0_12px_rgba(98,68,252,0.3)]",
                  isMultiLine ? "rounded-3xl flex-col items-end" : "rounded-full flex-row items-center",
                ].join(" ")}
              >
                <textarea
                  ref={inputRef}
                  className={[
                    "w-full bg-transparent border-none outline-none resize-none",
                    "text-lg font-normal leading-[1.5] text-neutral-700",
                    "placeholder:text-neutral-500 overflow-y-auto scrollbar-hide",
                    isMultiLine ? "px-0" : "px-4",
                  ].join(" ")}
                  placeholder="Write your answer..."
                  value={inputValue}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  aria-label="Type your answer"
                />
                <button
                  aria-label="Send answer"
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-violet-50 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-5 h-5 text-violet-600" />
                </button>
              </div>
            )}

            {/* Next / Finish button — visible setelah jawab */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="h-[66px] w-full flex items-center justify-center gap-4 text-white text-lg font-medium bg-violet-600 rounded-full px-4 shadow-[0_0_24px_rgba(98,68,252,0.3)] transition-all duration-300 hover:bg-violet-700 border-none cursor-pointer animate-[fadeUp_0.3s_ease]"
              >
                {isLastQuestion ? "Finish" : "Next question →"}
              </button>
            )}
          </div>

          {!isAnswered && (
            <p className="mt-2 text-center text-[11px] leading-4 font-normal text-neutral-500">Press Enter to send · Shift+Enter for new line</p>
          )}
        </footer>
      </div>
    </div>
  );
}

// ─── Keyframes ────────────────────────────────────────────────────────────────
const keyframesCSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;
