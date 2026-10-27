import { NextResponse } from 'next/server';
import { createMessage, listMessages } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import { sendContactNotification } from '@/lib/mail';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 400 });
  }

  await createMessage({ name, email, subject, message });
  await sendContactNotification({ name, email, subject, message });
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const messages = await listMessages();
  return NextResponse.json(messages);
}
