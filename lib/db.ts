import { PGlite } from '@electric-sql/pglite';
import { mkdirSync } from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data', 'pglite');

async function createDb(): Promise<PGlite> {
  mkdirSync(DB_DIR, { recursive: true });
  const db = new PGlite(DB_DIR);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS model_photos (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS catalog_photos (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  return db;
}

// ponytail: global singleton to survive hot-reload in dev
const g = global as typeof globalThis & { __pglite?: Promise<PGlite> };

export function getDb(): Promise<PGlite> {
  if (!g.__pglite) g.__pglite = createDb();
  return g.__pglite;
}
