import { NextResponse } from "next/server";
import { GoogleGenAI  } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_TOKEN });

export async function POST(request: Request) {
  
  try {
    const { topic } = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Buatlah materi pembelajaran kustom berbasis AI berdasarkan permintaan berikut.
        Topik: "${topic}"

        Kamu WAJIB merespons dengan format JSON murni yang mengikuti struktur objek berikut, tanpa pembuka markdown (\`\`\`json) atau teks lainnya:
        {
          "custom_topic_id": "top_ai_${Date.now()}",
          "user_id": "usr_current",
          "user_prompt_request": "${topic}",
          "created_at": "${new Date().toISOString()}",
          "custom_category": {
            "custom_category_id": "cat_ai_${Date.now()}",
            "name": "Kategori Otomatis AI"
          },
          "title": "Judul Modul Pembelajaran Buatan AI",
          "sub_topics": [
            {
              "sub_topic_id": "sub_ai_${Date.now()}_1",
              "title": "Judul Sub Bab Pertama",
              "materi_default": "Penjelasan materi yang sangat mendalam dan komprehensif..."
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
    return NextResponse.json(
      { error: "Gagal memuat data dari kecerdasan buatan," + " " + error || "" },
      { status: 500 }
    );
  }
}