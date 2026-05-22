// components/PdfUploader.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LearningResult } from "@/.next/types/learning";

export default function PdfUploader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", "user_123"); // replace with real user ID

    setLoading(true);
    try {
      const res = await fetch("/api/generate-from-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      localStorage.setItem("activeMaterial", JSON.stringify(data));
      router.push("/dashboard/material/generated");
    } catch (err: any) {
      console.error("Upload failed:", err.message);
      alert("Gagal mengunggah PDF: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="pdfupload" style={{ display: loading ? "none" : "block" }} className="cursor-pointer text-neutral-700">Use PDF File</label>
      <input type="file" id="pdfupload" accept=".pdf" className="hidden" onChange={handleUpload}/>
      {loading && <p className="text-body text-neutral-600">Processing PDF and Generating Modules...</p>}
    </div>
  );
}
