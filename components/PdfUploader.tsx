// components/PdfUploader.tsx
"use client";
import { useState } from "react";
import pdfParse from "pdf-parse";

export default function PdfUploader() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
        // ⚠️ Do NOT set Content-Type header manually — 
        // the browser sets it with the correct boundary for FormData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      setResult(data);
      console.log("Generated learning material:", data);
    } catch (err: any) {
      console.error("Upload failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="pdfupload" style={{ display: loading ? "none" : "block" }} className="cursor-pointer text-neutral-700">Use PDF File</label>
      <input type="file" id="pdfupload" accept=".pdf" className="hidden" onChange={handleUpload}/>
      {loading && <p>Processing PDF...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
