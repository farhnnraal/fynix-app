// app/api/evaluate/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_TOKEN});

export async function POST(request: Request) {
  try {
    const { question, userAnswer } = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
                Bertindaklah sebagai Dosen/Mentor AI yang kritis, objektif, dan tidak mudah percaya begitu saja. User baru saja menjawab sebuah soal essay.

                Data Acuan Penilaian:
                - Pertanyaan: ${question}
                - Jawaban Essay User: "${userAnswer}"

                Tugasmu:
                1. Analisis secara mendalam dan kritis "Jawaban Essay User" terhadap "Pertanyaan". Gunakan pengetahuan internalmu untuk memvalidasi apakah substansi fundamental dari jawaban tersebut secara ilmiah benar dan menjawab inti pertanyaan secara akurat.
                2. Jangan terkecoh oleh gaya bahasa user yang terlihat meyakinkan, menggunakan istilah teknis keren, atau kalimat yang panjang lebar, jika secara substansi sebenarnya kosong atau melenceng.
                3. Tentukan status kelulusan secara tegas: "Correct" jika konsep esensialnya benar/mendekati, atau "Incorrect" jika salah/miskonsepsi/melenceng jauh.
                4. GAYA BAHASA & STRUKTUR FEEDBACK (STRICT CONTROL): 
                - Berikan feedback WAJIB HANYA 1 kalimat yang santai, chill, mendalam, dan langsung to the point.
                - PERINGATAN KERAS: DILARANG memberi tahu, membocorkan, atau menjelaskan jawaban yang benar jika user salah. Biarkan mereka mencari tahu sendiri nanti.
                - DILARANG menggunakan kalimat pembuka template formal seperti "Jawaban Anda...", "Anda berhasil...", "Tepat sekali...".
                - LANGSUNG tunjuk statusnya secara singkat. 
                - Contoh jika benar: "Konsep fotosintesis di kloroplas sudah dapet, silakan lanjut ke soal berikutnya."
                - Contoh jika salah: "Miskonsepsi di bagian fungsi PATCH, silakan lanjut ke soal berikutnya."
                - Kamu WAJIB menutup kalimat tunggal tersebut dengan instruksi: "... silakan lanjut ke soal berikutnya."

                Kamu WAJIB merespons dengan format JSON murni tanpa pembuka/penutup markdown (\`\`\`json) :
                {
                "status": "Correct", 
                "feedback_instan": "Isi analisis kritis ringkasmu di sini... Silakan lanjut ke soal berikutnya."
                }
      `,
      config: { responseMimeType: "application/json" },
    });

    return NextResponse.json(JSON.parse(response.text || "{}"), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat data dari kecerdasan buatan," + " " + error || "" },
      { status: 500 });
  }
}