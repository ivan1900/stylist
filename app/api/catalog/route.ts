import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDb } from '@/lib/db';

const CATALOG_DIR = path.join(process.cwd(), 'public', 'photos', 'catalog');

export async function GET() {
  const db = await getDb();
  const result = await db.query<{ id: number; filename: string }>(
    'SELECT id, filename FROM catalog_photos ORDER BY created_at DESC'
  );
  const photos = result.rows.map((r) => ({
    id: r.id,
    url: `/photos/catalog/${r.filename}`,
  }));
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${randomUUID()}.${ext}`;

  await mkdir(CATALOG_DIR, { recursive: true });
  await writeFile(path.join(CATALOG_DIR, filename), Buffer.from(await file.arrayBuffer()));

  const db = await getDb();
  const result = await db.query<{ id: number }>(
    'INSERT INTO catalog_photos (filename) VALUES ($1) RETURNING id',
    [filename]
  );

  return NextResponse.json({ id: result.rows[0].id, url: `/photos/catalog/${filename}` });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const db = await getDb();
  const result = await db.query<{ filename: string }>(
    'DELETE FROM catalog_photos WHERE id = $1 RETURNING filename',
    [Number(id)]
  );

  const row = result.rows[0];
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await unlink(path.join(CATALOG_DIR, row.filename)).catch(() => null);

  return NextResponse.json({ ok: true });
}
