import { useState, useCallback } from "react";

// ─── Types: AI Response (output mentah dari /api/summary) ────────────────────

export interface AnswerList {
  question: string;
  answer: string;
}

export type QuestionStatus = "Understood" | "Partial" | "Not Understood";

export interface AiQuestionBreakdown {
  question_id: string;
  status: QuestionStatus;
  ai_feedback: string;
  question: string;
  answer: string;
}

export interface AiSummaryResult {
  total_score: number;
  ai_feedback: string;
  question_breakdown: AiQuestionBreakdown[];
}

// ─── Types: Learning History (struktur yang disimpan di localStorage) ─────────

export interface HistoryQuestionBreakdown {
  question_id: string;
  question_number: number;
  status: QuestionStatus;
  ai_feedback: string;
  question: string;
  answer: string;
}

export type HistoryStatus = "Passed" | "Failed";

export interface LearningHistory {
  history_id: string;
  user_id: string;
  topic_id: string;
  topic_title: string;
  is_custome_topic: boolean;
  date: string;
  level: string;
  score: number;
  status: HistoryStatus;
  ai_feedback: string;
  question_breakdown: HistoryQuestionBreakdown[];
}

// ─── Types: Hook params & return ─────────────────────────────────────────────

export interface SubmitSummaryParams {
  topicId: string;
  topicTitle: string;
  userId: string;
  isCustomTopic: boolean;
  level: string;
  answerList: AnswerList[];
}

interface UseSummaryQuizReturn {
  submitSummary: (params: SubmitSummaryParams) => Promise<LearningHistory | null>;
  data: AiSummaryResult | null;
  history: LearningHistory | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "learning_histories";
const PASS_THRESHOLD = 75;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Generate unique history_id: "hist_<timestamp>_<random4>" */
function generateHistoryId(): string {
  const rand = Math.random().toString(36).slice(2, 6);
  return `hist_${Date.now()}_${rand}`;
}

/** Baca learning_histories dari localStorage, return array kosong jika tidak ada / corrupt */
function readHistories(): LearningHistory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LearningHistory[]) : [];
  } catch {
    return [];
  }
}

/** Simpan array histories ke localStorage */
function writeHistories(histories: LearningHistory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
}

function mapToHistory(aiResult: AiSummaryResult, params: SubmitSummaryParams): LearningHistory {
  const score = Math.round(aiResult.total_score);

  return {
    history_id: generateHistoryId(),
    user_id: params.userId,
    topic_id: params.topicId,
    topic_title: params.topicTitle,
    is_custome_topic: params.isCustomTopic,
    date: new Date().toISOString(),
    level: params.level,
    score,
    status: score >= PASS_THRESHOLD ? "Passed" : "Failed",
    ai_feedback: aiResult.ai_feedback,
    question_breakdown: aiResult.question_breakdown.map((q, index) => ({
      question_id: q.question_id,
      question_number: index + 1,
      status: q.status,
      ai_feedback: q.ai_feedback,
      question: q.question,
      answer: q.answer,
    })),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSummaryQuiz(): UseSummaryQuizReturn {
  const [data, setData] = useState<AiSummaryResult | null>(null);
  const [history, setHistory] = useState<LearningHistory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSummary = useCallback(async (params: SubmitSummaryParams): Promise<LearningHistory | null> => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setHistory(null);

    try {
      // 1. Kirim ke API
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: params.topicTitle,
          answerList: params.answerList,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error ?? `Request failed with status ${response.status}`);
      }

      const aiResult: AiSummaryResult = await response.json();
      setData(aiResult);

      // 2. Map AI output → LearningHistory
      const newHistory = mapToHistory(aiResult, params);

      // 3. Simpan ke localStorage (prepend supaya history terbaru di atas)
      const existing = readHistories();
      writeHistories([newHistory, ...existing]);

      setHistory(newHistory);
      return newHistory;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setHistory(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { submitSummary, data, history, isLoading, error, reset };
}
