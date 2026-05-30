import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_TOKEN });

export async function POST(request: Request) {
  try {
    const { topic, user_id } = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Buatlah materi pembelajaran kustom berbasis AI berdasarkan permintaan berikut. 
        Topik Utama: "${topic}"
        
        Ketentuan Mutlak Isi Modul:
        Kamu WAJIB menghasilkan secara lengkap 3 objek topik terpisah di dalam array "topics". Tidak boleh kurang!
        Masing-masing objek mewakili tingkat kesulitan yang berbeda dengan ketentuan:
        1. Objek ke-1: Tingkat kesulitan "Easy" (Fokus pada konsep dasar, istilah, dan fundasi).
        2. Objek ke-2: Tingkat kesulitan "Medium" (Fokus pada mekanisme kerja, implementasi kasus, dan alur proses).
        3. Objek ke-3: Tingkat kesulitan "Hard" (Fokus pada analisis kritis, optimasi arsitektur, troubleshooting, atau kelemahan sistem).

        Ketentuan Konten Internal Tiap Topik:
        - Di setiap level kesulitan, buatlah minimal 3 item di dalam array "sub_topics". Isi "materi_default" harus padat, komprehensif, mendalam, dan tidak boleh hanya ringkasan pendek.
        - Di setiap level kesulitan, buatlah minimal 5 soal essay kritis tingkat tinggi (HOTS) di dalam array "questions".

        Kamu WAJIB merespons dengan format JSON murni mengikuti struktur ini tanpa pembuka/penutup markdown (\`\`\`json) :
        {
          "topics": [
            {
              "custom_topic_id": "top_ai_${Date.now()}_easy",
              "user_id": "${user_id}",
              "user_prompt_request": "${topic}",
              "created_at": "${new Date().toISOString()}",
              "custom_category": {
                "custom_category_id": "cat_ai_${Date.now()}",
                "name": "Kategori Otomatis AI"
              },
              "title": "Judul Modul Tingkat Dasar ${topic}",
              "difficulty": "Easy",
              "sub_topics": [
                { "sub_topic_id": "sub_ai_${Date.now()}_e1", "title": "Judul Sub Bab Easy 1", "materi_default": "Penjelasan mendalam materi dasar 1..." }
              ],
              "questions": [
                { "question_id": "q_ai_${Date.now()}_e1", "question": "Pertanyaan kritis Easy 1..." }
              ]
            }
          ]
        }
      `,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("AI tidak mengembalikan teks.");
    }

    const cleanJsonData = JSON.parse(responseText);
    return NextResponse.json(cleanJsonData, { status: 200 });
  } catch (error) {
    console.error("Gemini SDK Baru API Error:", error);
    return NextResponse.json({ error: "Gagal memuat data dari kecerdasan buatan," + " " + error || "" }, { status: 500 });
  }
}
