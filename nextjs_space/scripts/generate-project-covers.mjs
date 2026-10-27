/* Proje kapaklarini uretir: public/images/projeler/<id>.jpg (16/10, raster).
   Build degil, manuel calistirilir: node scripts/generate-project-covers.mjs
   SVG taslaklari scripts/cover-build/ altina yazilir, Playwright ile JPG'e donusturulur. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const W = 1600;
const H = 1000;
const svgDir = path.join(process.cwd(), 'scripts', 'cover-build');
const outDir = path.join(process.cwd(), 'public', 'images', 'projeler');
fs.mkdirSync(svgDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

const NOISE = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`;

function glow(id, accent) {
  return `<radialGradient id="${id}" cx="50%" cy="42%" r="72%">
    <stop offset="0%" stop-color="${accent}" stop-opacity="0.42"/>
    <stop offset="55%" stop-color="${accent}" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>`;
}

const LINE = 'rgba(240,231,219,0.30)';
const LINE_SOFT = 'rgba(240,231,219,0.14)';
const FILL = 'rgba(240,231,219,0.07)';

function frame({ name, accent, body }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <defs>${glow('g1', accent)}${NOISE}</defs>
  <rect width="${W}" height="${H}" fill="#08090c"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <g>${body}</g>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.13"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" stroke="rgba(255,255,255,0.08)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="40" y="72" font-size="15" letter-spacing="6" fill="rgba(255,255,255,0.35)">MEHMET KUM</text>
    <text x="${W - 40}" y="72" font-size="15" letter-spacing="4" text-anchor="end" fill="rgba(255,255,255,0.3)">PROJE</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(svgDir, `${name}.svg`), svg, 'utf-8');
  console.log('COVER', name);
}

const covers = [];

/* 1) Saha Yonetim Modulu — vardiya listesi + saha haritasi */
covers.push({
  name: 'saha-yonetim-modulu',
  accent: '#0ea5b7',
  body: `
  <rect x="130" y="220" width="10" height="470" rx="5" fill="${LINE_SOFT}"/>
  ${[0, 1, 2, 3].map((i) => `
    <circle cx="205" cy="${262 + i * 112}" r="17" stroke="${LINE}" stroke-width="2" fill="none"/>
    <rect x="248" y="${250 + i * 112}" width="${[470, 350, 560, 280][i]}" height="24" rx="7" fill="${i === 1 ? '#0ea5b7' : 'rgba(240,231,219,0.16)'}" opacity="${i === 1 ? 0.85 : 1}"/>
    <rect x="248" y="${286 + i * 112}" width="${[240, 180, 300, 130][i]}" height="10" rx="5" fill="${LINE_SOFT}"/>`).join('')}
  <g stroke="${LINE_SOFT}" stroke-width="1.5">
    ${Array.from({ length: 8 }, (_, c) => `<line x1="${880 + c * 76}" y1="200" x2="${880 + c * 76}" y2="700"/>`).join('')}
    ${Array.from({ length: 7 }, (_, r) => `<line x1="880" y1="${200 + r * 84}" x2="1416" y2="${200 + r * 84}"/>`).join('')}
  </g>
  ${[[1020, 320, '#0ea5b7'], [1180, 500, 'rgba(240,231,219,0.7)'], [1320, 400, 'rgba(240,231,219,0.7)']].map(([x, y, c]) => `
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y - 34}" stroke="${c}" stroke-width="3"/>
    <circle cx="${x}" cy="${y - 42}" r="9" fill="${c}"/>`).join('')}
  <rect x="880" y="740" width="250" height="20" rx="7" fill="${LINE_SOFT}"/>
  <rect x="1150" y="740" width="120" height="20" rx="7" fill="#0ea5b7" opacity="0.8"/>
  <rect x="130" y="150" width="520" height="2" rx="1" fill="${LINE_SOFT}"/>`
});

/* 2) Itfaiye olay yeri inceleme — arama kamerasi + delil isaretleri */
covers.push({
  name: 'docx-fire-investigation',
  accent: '#ff5a1f',
  body: `
  <g stroke="${LINE_SOFT}" stroke-width="1.5">
    ${Array.from({ length: 12 }, (_, c) => `<line x1="${620 + c * 66}" y1="190" x2="${620 + c * 66}" y2="720"/>`).join('')}
    ${Array.from({ length: 8 }, (_, r) => `<line x1="620" y1="${190 + r * 76}" x2="1352" y2="${190 + r * 76}"/>`).join('')}
  </g>
  <circle cx="990" cy="450" r="168" stroke="rgba(255,90,31,0.75)" stroke-width="3" fill="none"/>
  <circle cx="990" cy="450" r="6" fill="#ff5a1f"/>
  <line x1="990" y1="230" x2="990" y2="340" stroke="rgba(255,90,31,0.8)" stroke-width="2.5"/>
  <line x1="990" y1="560" x2="990" y2="670" stroke="rgba(255,90,31,0.8)" stroke-width="2.5"/>
  <line x1="770" y1="450" x2="882" y2="450" stroke="rgba(255,90,31,0.8)" stroke-width="2.5"/>
  <line x1="1098" y1="450" x2="1210" y2="450" stroke="rgba(255,90,31,0.8)" stroke-width="2.5"/>
  ${[[760, 590], [1210, 300], [1180, 640]].map(([x, y], i) => `
    <circle cx="${x}" cy="${y}" r="13" stroke="rgba(255,90,31,0.9)" stroke-width="2.5" fill="none"/>
    <circle cx="${x}" cy="${y}" r="3.5" fill="#ff5a1f"/>
    <text x="${x + 22}" y="${y + 5}" font-size="15" letter-spacing="2" font-family="ui-monospace, monospace" fill="rgba(255,255,255,0.45)">0${i + 1}</text>`).join('')}
  <rect x="132" y="210" width="330" height="140" rx="14" stroke="${LINE}" stroke-width="2" fill="${FILL}"/>
  <circle cx="205" cy="280" r="34" stroke="${LINE}" stroke-width="2" fill="none"/>
  <circle cx="205" cy="280" r="13" fill="rgba(255,90,31,0.85)"/>
  <line x1="252" y1="262" x2="432" y2="262" stroke="${LINE}" stroke-width="3"/>
  <line x1="252" y1="286" x2="400" y2="286" stroke="${LINE_SOFT}" stroke-width="3"/>
  <line x1="252" y1="310" x2="420" y2="310" stroke="${LINE_SOFT}" stroke-width="3"/>
  <rect x="132" y="560" width="330" height="180" rx="14" stroke="${LINE}" stroke-width="2" fill="${FILL}"/>
  <rect x="160" y="590" width="274" height="14" rx="7" fill="${LINE_SOFT}"/>
  <rect x="160" y="618" width="230" height="14" rx="7" fill="${LINE_SOFT}"/>
  <rect x="160" y="646" width="180" height="14" rx="7" fill="rgba(255,90,31,0.55)"/>
  <rect x="160" y="686" width="106" height="30" rx="8" stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none"/>`
});

/* 3) Inceleme goruntu arsivi — klasor + foto kartlar */
covers.push({
  name: 'docx-scene-archive',
  accent: '#6d28d9',
  body: `
  <g transform="translate(150 260)">
    <rect x="0" y="0" width="300" height="70" rx="12" stroke="${LINE}" stroke-width="2" fill="${FILL}"/>
    <rect x="0" y="-14" width="120" height="16" rx="6" fill="${FILL}" stroke="${LINE}" stroke-width="2"/>
    ${[0, 1, 2, 3, 4].map((i) => `<line x1="26" y1="${26 + i * 9}" x2="${274 - i * 22}" y2="${26 + i * 9}" stroke="${LINE_SOFT}" stroke-width="3"/>`).join('')}
  </g>
  ${[0, 1, 2].map((c) => [0, 1].map((r) => {
    const x = 560 + c * 290;
    const y = 210 + r * 210;
    const hot = c === 1 && r === 0;
    const rot = hot ? -4 : (c + r) % 2 ? 2 : -2;
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="0" y="0" width="240" height="164" rx="12" stroke="${hot ? '#6d28d9' : LINE}" stroke-width="${hot ? 3 : 2}" fill="${hot ? 'rgba(109,40,217,0.16)' : FILL}"/>
      <rect x="16" y="16" width="208" height="104" rx="6" fill="rgba(240,231,219,0.10)"/>
      <circle cx="${60 + c * 18}" cy="${58 + r * 8}" r="20" fill="rgba(240,231,219,0.20)"/>
      <rect x="190" y="26" width="24" height="18" rx="4" fill="${hot ? 'rgba(109,40,217,0.9)' : 'rgba(240,231,219,0.25)'}"/>
      <rect x="16" y="132" width="${[150, 190, 120][c]}" height="10" rx="5" fill="${LINE_SOFT}"/>
    </g>`;
  }).join('')).join('')}
  <rect x="150" y="660" width="330" height="26" rx="8" fill="${LINE_SOFT}"/>
  <rect x="150" y="700" width="220" height="10" rx="5" fill="${LINE_SOFT}"/>`
});

/* 4) Kartli su satis — kart + damla + olcek */
covers.push({
  name: 'docx-aski-card-meter',
  accent: '#0d9488',
  body: `
  <g transform="translate(210 300)">
    <rect x="0" y="0" width="360" height="210" rx="20" stroke="rgba(240,231,219,0.55)" stroke-width="2.5" fill="${FILL}"/>
    <rect x="26" y="26" width="54" height="42" rx="8" fill="rgba(240,231,219,0.35)"/>
    <line x1="26" y1="47" x2="80" y2="47" stroke="#08090c" stroke-width="3"/>
    <line x1="53" y1="26" x2="53" y2="68" stroke="#08090c" stroke-width="3"/>
    <rect x="0" y="118" width="360" height="26" fill="rgba(240,231,219,0.16)"/>
    <line x1="26" y1="180" x2="190" y2="180" stroke="${LINE}" stroke-width="4"/>
  </g>
  ${[[640, 430, 22], [700, 470, 16], [748, 500, 11]].map(([x, y, r], i) => `
    <path transform="translate(${x} ${y})" d="M0 ${-r * 1.9} C ${r * 0.8} ${-r * 0.7} ${r * 1.05} ${r * 0.15} 0 ${r * 1.05} C ${-r * 1.05} ${r * 0.15} ${-r * 0.8} ${-r * 0.7} 0 ${-r * 1.9} Z" fill="${i === 0 ? '#0d9488' : 'rgba(13,148,136,0.55)'}"/>`).join('')}
  <g transform="translate(900 250)">
    <path d="M0 190 A 190 190 0 0 1 380 190" stroke="${LINE}" stroke-width="3" fill="none"/>
    <path d="M56 190 A 134 134 0 0 1 324 190" stroke="#0d9488" stroke-width="5" fill="none"/>
    <line x1="190" y1="190" x2="292" y2="106" stroke="rgba(240,231,219,0.85)" stroke-width="4"/>
    <circle cx="190" cy="190" r="9" fill="rgba(240,231,219,0.9)"/>
    <rect x="46" y="250" width="288" height="18" rx="9" fill="${LINE_SOFT}"/>
    <rect x="46" y="286" width="200" height="18" rx="9" fill="rgba(13,148,136,0.6)"/>
  </g>`
});

/* 5) Sayac operasyonlari — kadran + is emri satirlari */
covers.push({
  name: 'docx-aski-meter-field',
  accent: '#b45309',
  body: `
  <g transform="translate(210 250)">
    <circle cx="210" cy="210" r="200" stroke="${LINE}" stroke-width="3" fill="none"/>
    ${Array.from({ length: 24 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 24;
      const x1 = 210 + 186 * Math.cos(a), y1 = 210 + 186 * Math.sin(a);
      const x2 = 210 + (i % 6 === 0 ? 168 : 178) * Math.cos(a);
      const y2 = 210 + (i % 6 === 0 ? 168 : 178) * Math.sin(a);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 6 === 0 ? LINE : LINE_SOFT}" stroke-width="2.5"/>`;
    }).join('')}
    <line x1="210" y1="210" x2="${210 + 130 * Math.cos(-Math.PI / 3.4)}" y2="${210 + 130 * Math.sin(-Math.PI / 3.4)}" stroke="#b45309" stroke-width="5"/>
    <circle cx="210" cy="210" r="11" fill="rgba(240,231,219,0.9)"/>
    <rect x="100" y="440" width="220" height="16" rx="8" fill="${LINE_SOFT}"/>
  </g>
  ${[0, 1, 2, 3].map((i) => `
    <g transform="translate(760 ${210 + i * 104})">
      <circle cx="18" cy="18" r="17" stroke="${i === 1 ? '#b45309' : LINE}" stroke-width="2.5" fill="none"/>
      <path d="M11 18 L17 24 L27 12" stroke="${i === 1 ? '#b45309' : LINE}" stroke-width="3" fill="none"/>
      <rect x="58" y="4" width="${[430, 320, 260, 380][i]}" height="20" rx="8" fill="${i === 1 ? 'rgba(180,83,9,0.75)' : 'rgba(240,231,219,0.16)'}"/>
      <rect x="58" y="38" width="${[200, 150, 110, 170][i]}" height="9" rx="4.5" fill="${LINE_SOFT}"/>
    </g>`).join('')}
  <rect x="760" y="894" width="180" height="26" rx="9" fill="rgba(180,83,9,0.65)"/>`
});

/* 6) Oracle ODI & BI — veri akin diyagrami */
covers.push({
  name: 'docx-aski-odi-obi',
  accent: '#1d4ed8',
  body: `
  ${[0, 1, 2].map((i) => `
    <g>
      <rect x="150" y="${220 + i * 160}" width="240" height="96" rx="12" stroke="${LINE}" stroke-width="2" fill="${FILL}"/>
      <circle cx="182" cy="${268 + i * 160}" r="12" stroke="${LINE}" stroke-width="2" fill="none"/>
      <line x1="210" y1="${250 + i * 160}" x2="352" y2="${250 + i * 160}" stroke="${LINE}" stroke-width="3"/>
      <line x1="210" y1="${272 + i * 160}" x2="300" y2="${272 + i * 160}" stroke="${LINE_SOFT}" stroke-width="3"/>
      <path d="M390 ${268 + i * 160} H 640" stroke="${i === 1 ? '#1d4ed8' : LINE}" stroke-width="${i === 1 ? 3.5 : 2}" ${i !== 1 ? 'stroke-dasharray="7 7"' : ''}/>
      <path d="M632 ${268 + i * 160} l-12 -7 v14 z" fill="${i === 1 ? '#1d4ed8' : LINE}"/>
    </g>`).join('')}
  <polygon points="760,340 900,340 940,420 900,500 760,500 720,420" stroke="rgba(29,78,216,0.9)" stroke-width="3" fill="rgba(29,78,216,0.14)"/>
  <polygon points="760,352 892,352 924,420 892,488 760,488 728,420" stroke="${LINE_SOFT}" stroke-width="1.5" fill="none"/>
  <path d="M940 420 H 1180" stroke="#1d4ed8" stroke-width="3.5"/>
  <path d="M1172 420 l-12 -7 v14 z" fill="#1d4ed8"/>
  ${[0, 1].map((i) => `
    <rect x="1180" y="${330 + i * 150}" width="280" height="90" rx="12" stroke="${LINE}" stroke-width="2" fill="${FILL}"/>
    ${Array.from({ length: 5 }, (_, b) => `<rect x="1208" y="${388 - [26, 40, 34, 50, 30][b]}" width="28" height="${[26, 40, 34, 50, 30][b]}" rx="4" fill="${b === 3 ? '#1d4ed8' : 'rgba(240,231,219,0.22)'}" transform="translate(${b * 44} 0)"/>`).join('')}
    <line x1="1208" y1="396" x2="1432" y2="396" stroke="${LINE_SOFT}" stroke-width="2"/>`).join('')}
  <rect x="150" y="660" width="430" height="22" rx="8" fill="${LINE_SOFT}"/>
  <rect x="150" y="698" width="330" height="22" rx="8" fill="${LINE_SOFT}"/>`
});

/* 7) Cografi & mali karar destegi — kontur harita + turler */
covers.push({
  name: 'docx-geo-finance-dss',
  accent: '#0f766e',
  body: `
  <g stroke="rgba(15,118,110,0.55)" stroke-width="2" fill="none" transform="translate(240 460)">
    <ellipse rx="240" ry="150" transform="rotate(-18)"/>
    <ellipse rx="180" ry="110" transform="rotate(-18)"/>
    <ellipse rx="120" ry="72" transform="rotate(-18)"/>
    <ellipse rx="62" ry="36" transform="rotate(-18)"/>
  </g>
  <g transform="translate(240 460)">
    <line x1="0" y1="0" x2="0" y2="-40" stroke="rgba(240,231,219,0.8)" stroke-width="3"/>
    <circle cx="0" cy="-48" r="9" fill="#0f766e"/>
  </g>
  <g stroke="${LINE_SOFT}" stroke-width="1.5">
    <line x1="760" y1="210" x2="760" y2="730"/><line x1="760" y1="730" x2="1440" y2="730"/>
    ${Array.from({ length: 6 }, (_, r) => `<line x1="760" y1="${730 - r * 104}" x2="1440" y2="${730 - r * 104}"/>`).join('')}
  </g>
  ${[0, 1, 2, 3, 4].map((i) => `
    <rect x="${820 + i * 128}" y="${730 - [150, 260, 210, 400, 310][i]}" width="64" height="${[150, 260, 210, 400, 310][i]}" rx="8" fill="${i === 3 ? '#0f766e' : 'rgba(240,231,219,0.14)'}"/>`).join('')}
  <polyline points="${[0, 1, 2, 3, 4].map((i) => `${852 + i * 128},${730 - [150, 260, 210, 400, 310][i] - 40}`).join(' ')}" stroke="rgba(240,231,219,0.5)" stroke-width="2.5" fill="none"/>
  ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${852 + i * 128}" cy="${730 - [150, 260, 210, 400, 310][i] - 40}" r="6" fill="${i === 3 ? '#0f766e' : 'rgba(240,231,219,0.75)'}"/>`).join('')}`
});

/* 8) Personel devam kontrol — giris cihazi + devam akisi */
covers.push({
  name: 'docx-attendance',
  accent: '#be123c',
  body: `
  <g transform="translate(180 250)">
    <rect x="0" y="0" width="300" height="420" rx="22" stroke="${LINE}" stroke-width="2.5" fill="${FILL}"/>
    <rect x="50" y="46" width="200" height="18" rx="9" fill="rgba(240,231,219,0.25)"/>
    <circle cx="150" cy="120" r="16" fill="#be123c" opacity="0.9"/>
    <circle cx="150" cy="120" r="28" stroke="rgba(190,18,60,0.5)" stroke-width="2" fill="none"/>
    ${[0, 1, 2].map((r) => `${[0, 1, 2].map((c) => `<circle cx="${92 + c * 58}" cy="${230 + r * 52}" r="11" fill="rgba(240,231,219,0.16)"/>`).join('')}`).join('')}
  </g>
  ${[0, 1, 2, 3, 4].map((i) => {
    const y = 210 + i * 104;
    const w = [520, 430, 560, 380, 470][i];
    const off = i === 2;
    return `<g>
      <circle cx="780" cy="${y}" r="15" stroke="${off ? LINE_SOFT : LINE}" stroke-width="2.5" fill="none"/>
      <circle cx="780" cy="${y - 7}" r="5.5" fill="${off ? LINE_SOFT : LINE}"/>
      <path d="M770 ${y + 10} q10 -14 20 0" stroke="${off ? LINE_SOFT : LINE}" stroke-width="2.5" fill="none"/>
      <line x1="830" y1="${y}" x2="${830 + w}" y2="${y}" stroke="${off ? 'rgba(240,231,219,0.10)' : 'rgba(240,231,219,0.30)'}" stroke-width="10" ${off ? 'stroke-dasharray="2 16"' : ''} stroke-linecap="round"/>
      ${off ? '' : `<circle cx="830" cy="${y}" r="9" fill="#be123c"/><circle cx="${830 + w}" cy="${y}" r="9" fill="rgba(240,231,219,0.5)"/>`}
    </g>`;
  }).join('')}
  <g font-family="ui-monospace, monospace" fill="rgba(255,255,255,0.4)" font-size="14" letter-spacing="3">
    <text x="1500" y="216" text-anchor="end">GİRİŞ</text>
    <text x="1500" y="732" text-anchor="end">ÇIKIŞ</text>
  </g>`
});

/* --- SVG yaz --- */
for (const c of covers) frame(c);

/* --- JPG rasterize (SVG'yi HTML'e gomup og goruntusu al) --- */
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
for (const c of covers) {
  const svg = fs.readFileSync(path.join(svgDir, `${c.name}.svg`), 'utf-8');
  const html = path.join(svgDir, `${c.name}.html`);
  fs.writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg}</body></html>`, 'utf-8');
  await page.goto(`file:///${html.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  const svgEl = await page.$('svg');
  await svgEl.screenshot({ path: path.join(outDir, `${c.name}.jpg`), type: 'jpeg', quality: 86 });
  console.log('JPG', c.name);
}
await browser.close();
console.log('DONE', covers.length);
