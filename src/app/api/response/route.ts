import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server'

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!})

async function generateCaptionsFromLLM(prompt: string): Promise<string> {
  const model = genAI.models;
  const result = await model.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt
  })
  if(!result || !result.text) {
    return "no response"
  }
  const res: string = result.text;
  return res;
}

function extractCaptions(text: string): string[] {
  return text
    .split('\n')
    .filter((line: string) => line.trim() && /^[0-9]/.test(line))
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 })
    }

    const rawOutput = await generateCaptionsFromLLM(prompt)
    const captions = extractCaptions(rawOutput)

    return NextResponse.json({ captions }, { status: 200 })
  } catch (error) {
    console.error('[API ERROR] /api/generate', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
