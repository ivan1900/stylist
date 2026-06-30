import { NextRequest, NextResponse } from 'next/server';
import { generateText, generateImage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { readFileSync } from 'fs';
import { join, extname } from 'path';

// Vercel serverless: allow up to 60s for the two-step AI call
export const maxDuration = 60;

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

function readImageAsBase64(relativeUrl: string): { base64: string; mimeType: string } {
  const filePath = join(process.cwd(), 'public', relativeUrl);
  const buffer = readFileSync(filePath);
  const mimeType = MIME_MAP[extname(relativeUrl).toLowerCase()] ?? 'image/jpeg';
  return { base64: buffer.toString('base64'), mimeType };
}

export async function POST(req: NextRequest) {
  const { modelImageUrl, catalogImageUrls } = await req.json() as {
    modelImageUrl: string;
    catalogImageUrls: string[];
  };

  if (!modelImageUrl || !catalogImageUrls?.length) {
    return NextResponse.json({ error: 'Faltan imágenes requeridas' }, { status: 400 });
  }

  if (catalogImageUrls.length > 4) {
    return NextResponse.json({ error: 'Máximo 4 prendas permitidas' }, { status: 400 });
  }

  // --- Paso 1: GPT-4o Vision analiza el modelo y las prendas ---
  const modelImg = readImageAsBase64(modelImageUrl);
  const catalogImgs = catalogImageUrls.map(readImageAsBase64);

  const { text: dallePrompt } = await generateText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are a fashion stylist AI. Analyze the following images:
- First image: the person (model) who will try on clothes
- Remaining images: clothing items and/or accessories to be worn

Write a detailed, vivid image generation prompt for DALL-E 3 that shows:
1. The exact appearance of the person: hair color/style, skin tone, body type, facial features
2. The person wearing ALL the clothing items and accessories shown
3. Professional fashion photography style, full-body shot, neutral studio background

Be specific about colors, fabrics, and styling. Write the prompt in English only. Return ONLY the prompt text, no explanations.`,
          },
          { type: 'image', image: modelImg.base64, mimeType: modelImg.mimeType as 'image/jpeg' },
          ...catalogImgs.map((img) => ({
            type: 'image' as const,
            image: img.base64,
            mimeType: img.mimeType as 'image/jpeg',
          })),
        ],
      },
    ],
  });

  // --- Paso 2: DALL-E 3 genera la imagen a partir del prompt ---
  const { image } = await generateImage({
    model: openai.image('dall-e-3'),
    prompt: dallePrompt,
    size: '1024x1024',
  });

  const imageUrl = `data:image/png;base64,${image.base64}`;
  return NextResponse.json({ imageUrl });
}
