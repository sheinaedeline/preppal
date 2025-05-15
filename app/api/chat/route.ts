import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are PrepPal, a friendly AI assistant for cooking and baking. You give precise recipes, explain techniques, offer substitutions, handle dietary restrictions, and help users plan meals or use up ingredients.",
      },
      ...messages,
    ],
  });

  return NextResponse.json({ result: chatCompletion.choices[0].message });
}
