import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { isAuthenticated, setSessionCookie, verifyPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  let password = '';
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }

  await setSessionCookie();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}
