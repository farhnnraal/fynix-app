// app/api/summary/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_TOKEN });

interface AnswerList {
  question: string;
  answer: string;
}

interface RequestObject {
  topic: string;
  answerList: AnswerList[];
}

export async function POST(request: Request) {
  try {
    const { topic, answerList } = (await request.json()) as RequestObject;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
      Kamu adalah sistem evaluasi AI dari FennyTech yang kritis, objektif, mendalam, dan tidak mudah percaya begitu saja.
      User baru saja menyelesaikan kelas essay tentang topik "${topic}".

      Berikut adalah data mentah seluruh pertanyaan beserta jawaban essay dari user:
      ${JSON.stringify(answerList)}

      Tugasmu sebagai evaluator tunggal:
      1. Analisis setiap jawaban essay user secara kritis menggunakan pengetahuan internalmu. Jangan terkecoh gaya bahasa yang meyakinkan jika substansinya kosong atau melenceng.
      2. Tentukan status untuk tiap soal secara tegas dengan ketentuan:
        - "Understood": Jika konsep esensialnya benar, matang, dan tepat.
        - "Partial": Jika ada poin penting yang benar namun kurang lengkap, menggantung, atau mengandung sedikit miskonsepsi.
        - "Not Understood": Jika jawaban salah, melenceng jauh, atau substansinya kosong.
      3. Hitung skor total user secara matematis dengan rumus bobot: 
        Skor = ((Jumlah "Understood" + (0.5 * Jumlah "Partial")) / Total semua soal) * 100
      4. Tulis evaluasi makro secara mendalam (kelebihan, kekurangan, saran) pada "ai_feedback" global, dan analisis mikro yang mendalam tentang letak kebenaran atau miskonsepsi user pada tiap-tiap soal tanpa membocorkan kunci jawaban asli di dalamnya.
      5. Gunakan gaya bahasa yang santai, chill, namun mendalam dan objektif (tanpa afirmasi basa-basi atau pujian berlebihan yang tidak perlu).

      Kamu WAJIB merespons dengan format JSON murni mengikuti struktur ini tanpa pembuka/penutup markdown:
      {
        "total_score": 80, 
        "ai_feedback": "Tulis ringkasan global analisis performa belajar user di sini secara makro, chill, dan mendalam...",
        "question_breakdown": [
          {
            "question_id": "Isi dengan question_id yang sesuai dari data input",
            "question": "Isi dengan pertanyaan user",
            "answer": "Isi dengan jawaban user",
            "status": "Correct", 
            "ai_feedback": "Tulis analisis mikro di sini (MAKSIMAL 2 KALIMAT). Langsung tunjuk poin benar atau letak miskonsepsinya dengan chill tanpa membocorkan jawaban yang benar."
          }
        ]
      }
    `,
      config: {
        responseMimeType: "application/json",
      },
    });

    return NextResponse.json(JSON.parse(response.text || "{}"), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal merangkum hasil" }, { status: 500 });
  }
}
