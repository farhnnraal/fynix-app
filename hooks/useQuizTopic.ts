import { useState, useEffect } from "react";

export interface Question {
  question_id: string;
  [key: string]: unknown;
}

export interface SubTopic {
  sub_topic_id: string;
  title: string;
  [key: string]: unknown;
}

export interface CustomCategory {
  custom_category_id: string;
  name: string;
}

export interface CustomTopic {
  custom_topic_id: string;
  user_id: string;
  user_prompt_request: string;
  created_at: string;
  custom_category: CustomCategory;
  difficulty: string;
  questions: Question[];
  sub_topics: SubTopic[];
  title: string;
}

type Status = "idle" | "loading" | "success" | "not_found" | "error";

interface UseTopicQuizReturn {
  topic: CustomTopic | null;
  status: Status;
  error: string | null;
}

const STORAGE_KEY = "custom_ai_topics";

export function useQuizTopic(topicId: string | undefined): UseTopicQuizReturn {
  const [topic, setTopic] = useState<CustomTopic | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) {
      setStatus("idle");
      setTopic(null);
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setStatus("not_found");
        setError(`Tidak ada data di localStorage dengan key "${STORAGE_KEY}".`);
        return;
      }

      const parsed: unknown = JSON.parse(raw);

      // Support both array dan single object
      const topics: CustomTopic[] = Array.isArray(parsed) ? parsed : [parsed];

      const found = topics.find((t) => t.custom_topic_id === topicId) ?? null;

      if (!found) {
        setStatus("not_found");
        setError(`Topic dengan ID "${topicId}" tidak ditemukan.`);
        return;
      }

      setTopic(found);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? `Gagal parse data localStorage: ${err.message}` : "Terjadi kesalahan tak terduga.");
    }
  }, [topicId]);

  return { topic, status, error };
}
