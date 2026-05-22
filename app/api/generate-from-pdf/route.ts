import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const tokenStudio = process.env.GEMINI_API_TOKEN;
const ai = new GoogleGenAI({ apiKey: tokenStudio });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const user_id = formData.get("user_id") as string;

    if (!file) {
      return NextResponse.json(
        { error: "File PDF tidak ditemukan." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await pdfParse(buffer);

    const extractedText = data.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: "Gagal mengekstrak teks atau PDF kosong." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Kamu adalah AI ahli kurikulum pendidikan dari FennyTech. Tugasmu adalah membaca, menganalisis, dan merangkum Dokumen Sumber di bawah ini menjadi sebuah materi pembelajaran terstruktur beserta kuis essay.

        DOKUMEN SUMBER:
        """
        ${extractedText}
        """

        TUGAS UTAMA:
        1. Buat judul modul yang representatif berdasarkan dokumen.
        2. Pecah isi dokumen menjadi minimal minimal 2-3 topik materi yang mendalam, padat, dan esensial.
        3. Pecah tiap topik tersebut menjadi sub-topik yang mendalam dan detail, minimal 3 sub-topik.
        4. Buatlah minimal 5 soal essay kritis yang menantang pemahaman user berdasarkan materi tersebut.

        Kamu WAJIB merespons dengan format JSON murni mengikuti struktur ini tanpa pembuka/penutup markdown:
        {
            "custom_ai_topics": [
                {
                    "custom_topic_id": "top_ai_${Date.now()}",
                    "user_id": "${user_id}", 
                    "user_prompt_request": "Materi di-generate otomatis melalui unggahan file dokumen PDF",
                    "created_at": "${new Date().toISOString()}",
                    "custom_category": {
                        "custom_category_id": "cat_ai_${Date.now()}",
                        "name": "Tentukan nama kategori bidang ilmu yang cocok dengan isi dokumen secara spesifik"
                    },
                    "title": "Judul Utama Modul Pembelajaran Berdasarkan PDF",
                    "difficulty": "Tentukan tingkat kesulitan materi di sini (Beginner/Intermediate/Advanced)",
                    "sub_topics": [
                            {
                            "sub_topic_id": "sub_ai_${Date.now()}_1",
                            "title": "Judul Sub-Bab Pertama",
                            "materi_default": "Rangkuman materi sub-bab pertama yang diambil secara mendalam dan detail dari dokumen..."
                            }
                        ],
                        "questions": [
                            {
                            "question_id": "q_ai_${Date.now()}_1",
                            "question": "Pertanyaan essay kritis tingkat tinggi pertama mengenai isi materi di atas..."
                            }
                        ]
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
      throw new Error("Gemini tidak mengembalikan respons.");
    }

    const finalJsonData = JSON.parse(responseText);

    return NextResponse.json(finalJsonData, { status: 200 });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal memproses dokumen: " + error.message,
      },
      { status: 500 }
    );
  }
}