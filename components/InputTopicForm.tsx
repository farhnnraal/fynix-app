// app/dashboard/(main)/page.tsx
"use client";

import { useState } from "react";

export default function GenerateTopicPage() {
  // State untuk menyimpan input dari user
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah page reload bawaan form HTML

    if (!topic.trim()) {
      alert("Please type a topic first!");
      return;
    }

    setLoading(true);

    try {
      // Mengirim POST request ke Route Handler Next.js
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
          user_id: "user_mock_123",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Berhasil mendapatkan data JSON dari Gemini
      console.log("AI Generated Data:", data);
      alert("Materi berhasil dibuat! Periksa konsol browser.");

      // TODO: Anda bisa menyimpan 'data' ke state global atau mengarahkan user ke halaman materi
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.message || "Gagal memproses materi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-3xl border border-neutral-300 bg-white">
        <div className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3">
          <label className="block text-label">Learning Topic</label>
          <input
            type="text"
            className="w-full text-body focus:outline-none"
            placeholder="Type topic that you want to learn here..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer bg-primary-500 px-3 py-2 rounded-lg w-full text-white text-btn transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Generating Materials..." : "Start Learning Now"}
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
  );
}
