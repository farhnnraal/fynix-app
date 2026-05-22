import { useState } from "react";

interface SubTopic {
  sub_topic_id: string;
  title: string;
  materi_default: string;
}

interface CustomCategory {
  custom_category_id: string;
  name: string;
}

interface TopicData {
  custom_topic_id: string;
  user_id: string;
  user_prompt_request: string;
  created_at: string;
  custom_category: CustomCategory;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  sub_topics: SubTopic[];
}

interface UseGenerateTopicProps {
  onSuccess: (data: TopicData) => void;
}

export function useGenerateTopic({ onSuccess }: UseGenerateTopicProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (value: string) => setTopic(value);

  const submitTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) return alert("Please type topic first!");

    const currentUserData = localStorage.getItem("currentUser");
    let userId = "";

    if (currentUserData) {
      try {
        const userObj = JSON.parse(currentUserData);
        userId = userObj.user_id;
      } catch (err) {
        console.error("Gagal melakukan parse objek currentUser:", err);
      }
    }

    if (!userId) {
      return alert("Please login first!");
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic, user_id: userId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error("Something went wrong! Please try again");

      const actualTopicObject: TopicData = data.topics && data.topics[0];

      if (!actualTopicObject) {
        throw new Error("Struktur respon AI tidak sesuai atau array 'topics' kosong.");
      }

      const existingTopicsRaw = localStorage.getItem("custom_ai_topics");
      let updatedTopicsArray: TopicData[] = [];

      if (existingTopicsRaw) {
        try {
          updatedTopicsArray = JSON.parse(existingTopicsRaw);
          // Pastikan data lama berbentuk array yang valid
          if (!Array.isArray(updatedTopicsArray)) {
            updatedTopicsArray = [];
          }
        } catch (e) {
          console.error("Gagal parse data custom_ai_topics lama:", e);
          updatedTopicsArray = [];
        }
      }

      updatedTopicsArray.push(actualTopicObject);
      localStorage.setItem("custom_ai_topics", JSON.stringify(updatedTopicsArray));
      onSuccess(actualTopicObject);
    } catch (error: any) {
      alert("Something went wrong! Please try again");
    } finally {
      setLoading(false);
    }
  };

  return { topic, loading, handleTopicChange, submitTopic };
}
