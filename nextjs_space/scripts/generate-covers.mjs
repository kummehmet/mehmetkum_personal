/* Makale kapaklarini uretir: public/images/covers/. Build dışı manuel çalışmalı. */
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'public', 'images', 'covers');
fs.mkdirSync(outDir, { recursive: true });

const W = 1600;
const H = 900;

const NOISE = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`;

function glow(id, accent, y = 100) {
  return `<radialGradient id="${id}" cx="50%" cy="${y}%" r="75%">
    <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
    <stop offset="55%" stop-color="${accent}" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>`;
}

function frame({ name, body, defs, label, sub }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <defs>${defs}${NOISE}</defs>
  <rect width="${W}" height="${H}" fill="#08090c"/>
  ${body}
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.13"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" stroke="rgba(255,255,255,0.08)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="40" y="72" font-size="15" letter-spacing="6" fill="rgba(255,255,255,0.35)">MEHMET KUM</text>
    <text x="${W - 40}" y="72" font-size="15" letter-spacing="4" text-anchor="end" fill="rgba(255,255,255,0.3)">MAKALE</text>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="40" y="${H - 56}" font-size="20" letter-spacing="6" fill="rgba(240,231,219,0.85)">${label}</text>
    <text x="40" y="${H - 26}" font-size="14" letter-spacing="3" fill="rgba(255,255,255,0.25)">${sub}</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg, 'utf-8');
  console.log('COVER', name);
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const SANS = "'Segoe UI', Roboto, Arial, sans-serif";

/* ---------------- article-1: İtfaiyenin dilini konuşan yazılım ---------------- */
{
  const lines = [
    [210, 'rgba(240,231,219,0.30)'],
    [330, 'rgba(240,231,219,0.22)'],
    [260, 'rgba(255,90,31,0.95)'],
    [440, 'rgba(240,231,219,0.26)'],
    [170, 'rgba(240,231,219,0.20)'],
    [390, 'rgba(240,231,219,0.24)'],
  ];
  const rows = lines
    .map(
      ([width, fill], i) =>
        `<rect x="120" y="${212 + i * 64}" width="${width}" height="22" rx="6" fill="${fill}"/>`
    )
    .join('\n  ');
  const chain = ['ÇAĞRI', 'EKİP', 'EKRAN']
    .map(
      (t, i) =>
        `<rect x="${1150 + i * 130}" y="252" width="104" height="52" rx="26" fill="none" stroke="rgba(240,231,219,0.35)"/>
    <text x="${1202 + i * 130}" y="285" font-family="${MONO}" font-size="16" letter-spacing="2" text-anchor="middle" fill="rgba(240,231,219,0.8)">${t}</text>
    ${i < 2 ? `<path d="M${1254 + i * 130} 278 h 52 m -14 -8 l 14 8 l -14 8" stroke="rgba(255,90,31,0.9)" stroke-width="2.5" fill="none"/>` : ''}`
    )
    .join('\n  ');
  frame({
    name: 'article-1',
    defs: glow('a1', '#FF4500', 88),
    body: `<rect width="${W}" height="${H}" fill="url(#a1)"/>
  <text x="120" y="140" font-family="${SANS}" font-weight="800" font-size="64" fill="rgba(240,231,219,0.92)">Sahadan doğan kod</text>
  <rect x="80" y="180" width="820" height="470" rx="20" fill="#0d0f14" stroke="rgba(255,255,255,0.12)"/>
  <circle cx="118" cy="216" r="7" fill="rgba(255,90,31,0.9)"/>
  <circle cx="142" cy="216" r="7" fill="rgba(255,255,255,0.18)"/>
  <circle cx="166" cy="216" r="7" fill="rgba(255,255,255,0.18)"/>
  <rect x="112" y="252" width="458" height="298" rx="8" fill="none" stroke="rgba(255,255,255,0.06)"/>
  ${rows}
  <rect x="120" y="${212 + 6 * 64 - 42}" width="18" height="30" fill="#ff5a1f"/>
  ${chain}
  <text x="120" y="610" font-family="${MONO}" font-size="16" letter-spacing="2" fill="rgba(255,90,31,0.95)">type FireCall = ceremony of field</text>`,
    label: 'İTFAİYENİN DİLİ',
    sub: 'OLAY → KARAR → EKRAN',
  });
}

/* ---------------- article-2: Saha gerçeği ile ofis arzının çatışması ---------------- */
{
  const node = (x, y, t, accent) =>
    `<rect x="${x}" y="${y}" width="200" height="58" rx="12" fill="#0d0f14" stroke="${accent}"/>
  <text x="${x + 100}" y="${y + 36}" font-family="${MONO}" font-size="17" letter-spacing="1" text-anchor="middle" fill="rgba(240,231,219,0.92)">${t}</text>`;
  const o = 'rgba(255,90,31,0.85)';
  const b = 'rgba(14,165,183,0.85)';
  frame({
    name: 'article-2',
    defs: `${glow('a2o', '#FF4500', 20)}${glow('a2b', '#0ea5b7', 20)}`,
    body: `<rect x="0" y="0" width="${W / 2}" height="${H}" fill="url(#a2o)" opacity="0.6"/>
  <rect x="${W / 2}" y="0" width="${W / 2}" height="${H}" fill="url(#a2b)" opacity="0.55"/>
  <text x="120" y="150" font-family="${SANS}" font-weight="800" font-size="58" fill="rgba(240,231,219,0.92)">İki hız, tek sistem</text>
  ${node(120, 330, 'SAHA EKİBİ', o)}
  ${node(120, 430, 'FORM', o)}
  ${node(120, 530, 'FOTOĞRAF', o)}
  ${node(1280, 330, 'RAPOR', b)}
  ${node(1280, 430, 'ONAY', b)}
  ${node(1280, 530, 'PANO', b)}
  <path d="M330 359 C 470 359, 480 220, 560 220 C 650 220, 660 386, 742 386" stroke="rgba(255,90,31,0.75)" stroke-width="2.5" fill="none" stroke-dasharray="10 8"/>
  <path d="M330 559 C 470 559, 480 696, 560 696 C 650 696, 660 530, 742 530" stroke="rgba(255,90,31,0.5)" stroke-width="2" fill="none" stroke-dasharray="10 8"/>
  <path d="M1270 359 C 1130 359, 1120 220, 1040 220 C 950 220, 940 386, 858 386" stroke="rgba(14,165,183,0.75)" stroke-width="2.5" fill="none" stroke-dasharray="10 8"/>
  <path d="M1270 559 C 1130 559, 1120 696, 1040 696 C 950 696, 940 530, 858 530" stroke="rgba(14,165,183,0.5)" stroke-width="2" fill="none" stroke-dasharray="10 8"/>
  <path d="M795 240 l 38 96 l -30 6 l 48 120 l -30 8 l 52 132" stroke="rgba(255,90,31,0.95)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="800" y="446" font-family="${MONO}" font-size="17" letter-spacing="4" text-anchor="middle" fill="rgba(240,231,219,0.85)">SÜRTÜŞME</text>`,
    label: 'SAHA ↔ OFİS',
    sub: 'AYNI İŞ, İKİ HIZ',
  });
}

/* ---------------- article-3: Yangın sonrası ilk 60 dakika ---------------- */
{
  const bars = [
    [0, 5, 240],
    [5, 15, 330],
    [15, 30, 425],
    [30, 45, 352],
    [45, 60, 500],
  ];
  const boxes = bars
    .map(
      ([a, b, h], i) =>
        `<rect x="${140 + i * 272}" y="${640 - h}" width="216" height="${h}" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.12)"/>
    <rect x="${140 + i * 272}" y="${640 - h}" width="216" height="${h}" rx="10" fill="url(#a3)" opacity="${(0.12 + i * 0.06).toFixed(2)}"/>
    <text x="${248 + i * 272}" y="${640 - h + 46}" font-family="${SANS}" font-weight="800" font-size="34" text-anchor="middle" fill="rgba(240,231,219,0.95)">${a}–${b}</text>
    <text x="${248 + i * 272}" y="${640 - h + 74}" font-family="${MONO}" font-size="13" letter-spacing="2" text-anchor="middle" fill="rgba(240,231,219,0.45)">DAKİKA</text>`
    )
    .join('\n  ');
  frame({
    name: 'article-3',
    defs: glow('a3', '#FF4500', 100),
    body: `<rect width="${W}" height="${H}" fill="url(#a3)" opacity="0.55"/>
  <text x="120" y="150" font-family="${SANS}" font-weight="800" font-size="60" fill="rgba(240,231,219,0.92)">İlk saat, sonraki her şeyi belirler</text>
  ${boxes}
  <text x="248" y="700" font-family="${MONO}" font-size="16" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.5)">KOMUTA</text>
  <text x="520" y="700" font-family="${MONO}" font-size="16" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.5)">OPERASYON</text>
  <text x="792" y="700" font-family="${MONO}" font-size="16" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.5)">PLANLAMA</text>
  <text x="1064" y="700" font-family="${MONO}" font-size="16" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.5)">LOJİSTİK</text>
  <text x="1336" y="700" font-family="${MONO}" font-size="16" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.5)">RAPOR</text>
  <line x1="120" y1="742" x2="1480" y2="742" stroke="rgba(255,90,31,0.6)" stroke-width="3"/>
  <text x="1480" y="778" font-family="${SANS}" font-weight="800" font-size="30" text-anchor="end" fill="#ff5a1f">0 → 60 dk</text>`,
    label: 'KOMUTA YAPISI',
    sub: 'RÜZGÂR, SU, EKİP — TEK SIRA',
  });
}

/* ---------------- article-4: Teknik borç ---------------- */
{
  let ledgr = '';
  for (let i = 0; i < 7; i += 1) {
    const wide = [333, 470, 260, 590, 380, 300, 520][i];
    const y = 236 + i * 52;
    ledgr += `<rect x="120" y="${y}" width="${Math.min(wide, 640)}" height="30" rx="8" fill="rgba(240,231,219,${0.1 + i * 0.012})"/>
    <rect x="${120 + Math.min(wide, 640) + 12}" y="${y + 8}" width="96" height="14" rx="7" fill="rgba(255,90,31,0.75)"/>`;
  }
  const r = 118;
  const cx = 1235;
  const cy = 430;
  const arc = (frac, radius, color, width) => {
    const a = (Math.min(frac, 1) * 2 * Math.PI).toFixed(3);
    const x = (cx + radius * Math.sin(Math.min(frac, 1) * 2 * Math.PI)).toFixed(1);
    const y = (cy - radius * Math.cos(Math.min(frac, 1) * 2 * Math.PI)).toFixed(1);
    const large = frac > 0.5 ? 1 : 0;
    return `<path d="M ${cx} ${cy - radius} A ${radius} ${radius} 0 ${large} 1 ${x} ${y}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`;
  };
  frame({
    name: 'article-4',
    defs: glow('a4', '#FF4500', 30),
    body: `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#a4)" opacity="0.45"/>
  <text x="120" y="152" font-family="${SANS}" font-weight="800" font-size="58" fill="rgba(240,231,219,0.92)">Borç büyümeden görün</text>
  <text x="120" y="200" font-family="${MONO}" font-size="15" letter-spacing="3" fill="rgba(240,231,219,0.45)">TEKNİK BORÇ DEFTERİ</text>
  ${ledgr}
  <circle cx="${cx}" cy="${cy}" r="${r + 34}" stroke="rgba(255,255,255,0.08)" fill="#0d0f14"/>
  ${arc(1, r, 'rgba(255,255,255,0.10)', 18)}
  ${arc(0.2, r, '#ff5a1f', 18)}
  <text x="${cx}" y="${cy - 8}" font-family="${SANS}" font-weight="800" font-size="62" text-anchor="middle" fill="rgba(240,231,219,0.95)">%20</text>
  <text x="${cx}" y="${cy + 30}" font-family="${MONO}" font-size="14" letter-spacing="2" text-anchor="middle" fill="rgba(240,231,219,0.5)">BAKIM PAYI</text>
  <text x="120" y="660" font-family="${MONO}" font-size="16" letter-spacing="2" fill="rgba(240,231,219,0.55)">"Yanlış sıra, bir çeyrek yıl kaybettirir."</text>`,
    label: 'ÜRÜN ÖNCELİKLENDİRME',
    sub: 'ETKİ · KANIT · MALİYET · RİSK',
  });
}

/* ---------------- article-5: Farklı Disiplinler — Aynı Pratikler ---------------- */
{
  const cx = W / 2;
  const cy = 470;
  const R = 210;
  const jobs = [
    ['MÜHENDİS', -1, -1],
    ['PROGRAMCI', 1, -1],
    ['İTFAİYECİ', -1, 1],
    ['YÖNETİCİ', 1, 1],
  ];
  const rings = jobs
    .map(
      ([t, dx, dy]) =>
        `<circle cx="${cx + dx * 95}" cy="${cy + dy * 95}" r="${R / 2}" stroke="rgba(255,90,31,0.5)" stroke-width="2" fill="none"/>`
    )
    .join('\n  ');
  const labels = jobs
    .map(
      ([t, dx, dy]) =>
        `<text x="${cx + dx * 265}" y="${cy + dy * 265 + 6}" font-family="${MONO}" font-size="17" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.75)">${t}</text>`
    )
    .join('\n  ');
  frame({
    name: 'article-5',
    defs: glow('a5', '#FF4500', 55),
    body: `<rect width="${W}" height="${H}" fill="url(#a5)" opacity="0.5"/>
  <text x="${cx}" y="150" font-family="${SANS}" font-weight="800" font-size="58" text-anchor="middle" fill="rgba(240,231,219,0.92)">Dört kimlik, tek disiplin</text>
  ${rings}
  <circle cx="${cx}" cy="${cy}" r="86" fill="#ff5a1f" opacity="0.16"/>
  <circle cx="${cx}" cy="${cy}" r="86" stroke="#ff5a1f" stroke-width="2.5" fill="none"/>
  <text x="${cx}" y="${cy - 6}" font-family="${MONO}" font-size="15" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.95)">AYNI</text>
  <text x="${cx}" y="${cy + 22}" font-family="${MONO}" font-size="15" letter-spacing="3" text-anchor="middle" fill="rgba(240,231,219,0.95)">PRATİK</text>
  ${labels}
  <text x="${cx}" y="${H - 118}" font-family="${MONO}" font-size="16" letter-spacing="2" text-anchor="middle" fill="rgba(240,231,219,0.5)">ölç → karar ver → uygula → paylaş</text>`,
    label: 'FARKLI DİSİPLİNLER',
    sub: 'AYNI PRATİKLER',
  });
}
