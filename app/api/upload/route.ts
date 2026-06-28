import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db';

const PHOTO_DIR = path.join(process.cwd(), 'public', 'photo');

export async function GET() {
  const db = await getDb();
  const result = await db.query<{ filename: string }>(
    'SELECT filename FROM model_photos ORDER BY created_at DESC LIMIT 1'
  );
  const row = result.rows[0];
  if (!row) return NextResponse.json({ url: null });
  return NextResponse.json({ url: `/photo/${row.filename}` });
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${randomUUID()}.${ext}`;

  await mkdir(PHOTO_DIR, { recursive: true });
  await writeFile(path.join(PHOTO_DIR, filename), Buffer.from(await file.arrayBuffer()));

  const db = await getDb();
  await db.query('INSERT INTO model_photos (filename) VALUES ($1)', [filename]);

  return NextResponse.json({ url: `/photo/${filename}` });
}
