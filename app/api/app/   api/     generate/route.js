import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { invoiceData } = await req.json();

    if (!invoiceData) {
      return NextResponse.json(
        { error: "Missing invoiceData" },
        { status: 400 }
        );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert document auditor.",
        },
        {
          role: "user",
          content: `Audit this invoice: ${JSON.stringify(invoiceData)}`,
        },
      ],
    });
    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Server error during document audit." },
      { status: 500 }
    );
  }
}
