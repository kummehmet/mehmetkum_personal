import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'mk_admin_session';
const DEFAULT_SECRET = 'mehmetkum-local-dev-secret';
const DEFAULT_PASSWORD = 'admin';

function secret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_SECRET;
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function verifyPassword(candidate: string): boolean {
  const expected = Buffer.from(adminPassword());
  const given = Buffer.from(candidate);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}

export function signSession(): string {
  return jwt.sign({ role: 'admin' }, secret(), { expiresIn: '7d' });
}

export async function setSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, signSession(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const payload = jwt.verify(token, secret());
    return typeof payload === 'object' && payload !== null && 'role' in payload;
  } catch {
    return false;
  }
}

export function hashToken(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('hex');
}
