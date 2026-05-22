// app/api/summary/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_TOKEN});

export async function POST(request: Request) {
  try {
    const { topic, answerList } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Kamu adalah sistem evaluasi AI dari FennyTech yang kritis, objektif, mendalam, dan tidak mudah percaya begitu saja.
      User baru saja menyelesaikan kelas essay tentang topik "${topic}".

      Berikut adalah data mentah seluruh pertanyaan beserta jawaban essay dari user:
      ${JSON.stringify(answerList)}

      Tugasmu sebagai evaluator tunggal:
      1. Analisis setiap jawaban essay user secara kritis menggunakan pengetahuan internalmu. Jangan terkecoh gaya bahasa yang meyakinkan jika substansinya kosong atau melenceng.
      2. Tentukan status untuk tiap soal secara tegas: "Correct" jika konsep esensialnya benar/mendekati, atau "Incorrect" jika salah/miskonsepsi/melenceng jauh.
      3. Hitung skor total user secara matematis dengan rumus dasar: (Jumlah soal yang "Correct" / Total semua soal) * 100.
      4. Tulis evaluasi makro secara mendalam (kelebihan, kekurangan, saran) pada "ai_feedback" global, dan analisis mikro yang mendalam tentang letak kebenaran atau miskonsepsi user pada tiap-tiap soal tanpa membocorkan kunci jawaban asli di dalamnya.
      5. Gunakan gaya bahasa yang santai, chill, namun mendalam dan objektif (tanpa afirmasi basa-basi atau pujian berlebihan yang tidak perlu).

      Kamu WAJIB merespons dengan format JSON murni mengikuti struktur ini tanpa pembuka/penutup markdown:
      {
        "total_score": 80, 
        "ai_feedback": "Tulis ringkasan global analisis performa belajar user di sini secara makro, chill, dan mendalam...",
        "question_breakdown": [
          {
            "question_id": "Isi dengan question_id yang sesuai dari data input",
            "status": "Correct", 
            "ai_feedback": "Tulis analisis mikro di sini (MAKSIMAL 2 KALIMAT). Langsung tunjuk poin benar atau letak miskonsepsinya dengan chill tanpa membocorkan jawaban yang benar."
          }
        ]
      }
    `,
    config: { 
      responseMimeType: "application/json" 
    },
  });

    return NextResponse.json(JSON.parse(response.text || "{}"), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal merangkum hasil" }, { status: 500 });
  }
}