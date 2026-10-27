/* "Konuşalım" mesajlarını Resend üzerinden e-posta bildirimine çevirir.
   RESEND_API_KEY tanımlı değilse sessizce atlar; hata durumunda formu bozmaz. */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_TO = 'mehmetkum@gmail.com';
const DEFAULT_FROM = 'onboarding@resend.dev';

export type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 24px;border-bottom:1px solid #eee;font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a8a8a;letter-spacing:2px;text-transform:uppercase;white-space:nowrap">${label}</td>
    <td style="padding:10px 24px;border-bottom:1px solid #eee;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;color:#1a1a1a">${value}</td>
  </tr>`;
}

function infoHtml(input: ContactNotification): string {
  return `${infoRow('İsim', esc(input.name))}${infoRow('E-posta', esc(input.email))}${infoRow('Konu', esc(input.subject))}`;
}

function bodyHtml(input: ContactNotification): string {
  const paragraphs = esc(input.message)
    .split(/\n{2,}|\r\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px">${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');
  return `<div style="padding:24px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1a1a1a">${paragraphs}</div>`;
}

export async function sendContactNotification(input: ContactNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[mail] RESEND_API_KEY yok — bildirim atlandı.');
    return;
  }

  const sentAt = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const html = `<div style="background:#f6f6f6;padding:32px 12px">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4e4e4;border-radius:14px;overflow:hidden">
      <div style="padding:22px 24px;border-bottom:3px solid #ff5a1f">
        <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:3px;color:#8a8a8a">MEHMETKUM.COM — KONUŞALIM</p>
      </div>
      <table style="width:100%;border-collapse:collapse">${infoHtml(input)}</table>
      ${bodyHtml(input)}
      <div style="padding:16px 24px;border-top:1px solid #eee;font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#9a9a9a">${sentAt}</div>
    </div>
  </div>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.MAIL_FROM ?? DEFAULT_FROM,
        to: [process.env.NOTIFY_EMAIL ?? DEFAULT_TO],
        reply_to: input.email,
        subject: `[Konuşalım] ${input.subject}`,
        html,
      }),
    });
    if (!response.ok) {
      console.error('[mail] gönderilemedi:', response.status, (await response.text()).slice(0, 300));
      return;
    }
    const result = (await response.json()) as { id?: string };
    console.log('[mail] bildirim gönderildi:', result.id ?? 'ok');
  } catch (error) {
    console.error('[mail] istek hatası:', error);
  }
}
