import { ImageResponse } from 'next/og';

export const alt = 'Mehmet Kum — Computer Engineer, Public Administrator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '72px',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, letterSpacing: 6, color: 'rgba(255,255,255,0.45)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#FF4500' }} />
          PORTFÖY — 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            MEHMET KUM
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: 'rgba(255,255,255,0.55)' }}>
            Bilgisayar Mühendisi · Kamu Yöneticisi · İtfaiye Müdürü
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: 'rgba(255,255,255,0.35)' }}>
          <span>mehmetkum.com</span>
          <span>KOD · YANGIN · YÖNETİM</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
