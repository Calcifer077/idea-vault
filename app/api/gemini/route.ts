// app/api/gemini/route.ts
import { askGemini } from "@/app/_lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await askGemini(prompt);
    return NextResponse.json({ text: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}