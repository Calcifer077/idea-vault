import { GoogleGenAI } from "@google/genai";

// Initialize the SDK with your API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

// use gemini
export async function askGemini(userPrompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userPrompt,
  });

  return response.text;
}
