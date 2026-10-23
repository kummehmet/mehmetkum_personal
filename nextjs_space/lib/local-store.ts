import { promises as fs } from 'node:fs';
import path from 'node:path';
import { seedData } from '@/data/seed';
import type { LocalDatabase } from '@/lib/content-types';

const LOCAL_FILE = path.join(process.cwd(), 'data', 'local-content.json');

function cloneSeed(): LocalDatabase {
  return JSON.parse(JSON.stringify(seedData)) as LocalDatabase;
}

export async function readLocal(): Promise<LocalDatabase> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as LocalDatabase;
  } catch {
    await writeLocal(cloneSeed());
    return cloneSeed();
  }
}

export async function writeLocal(db: LocalDatabase): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(db, null, 2), 'utf8');
}
