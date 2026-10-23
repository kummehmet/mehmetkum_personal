import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

const NOISE = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`;

function frame({ w, h, body, label, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <defs>${NOISE}</defs>
  <rect width="${w}" height="${h}" fill="#050506"/>
  ${body}
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.14"/>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" stroke="rgba(255,255,255,0.08)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="rgba(255,255,255,0.45)">
    <text x="34" y="${h - 52}" font-size="13" letter-spacing="3">${label}</text>
    <text x="34" y="${h - 32}" font-size="11" letter-spacing="2" fill="rgba(255,255,255,0.25)">${sub}</text>
  </g>
</svg>`;
}

function embers(w, h, hue = 22) {
  const dots = [];
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 137.5) % w;
    const y = h - ((i * 71.3) % (h * 0.9));
    const r = 0.8 + ((i * 13) % 22) / 10;
    const o = 0.15 + ((i * 7) % 60) / 100;
    dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="hsla(${hue}, 100%, 60%, ${o.toFixed(2)})"/>`);
  }
  return `<ellipse cx="${w / 2}" cy="${h * 1.02}" rx="${w * 0.62}" ry="${h * 0.6}" fill="url(#glo)"/>
  ${dots.join('\n  ')}`;
}

function scene(kind, w, h, accent = '#FF4500') {
  const glow = `<radialGradient id="glo" cx="50%" cy="100%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="${accent}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>`;

  if (kind === 'embers') {
    return { defs: glow, body: embers(w, h) + `<rect width="${w}" height="${h}" fill="url(#glo)" opacity="0.7"/>` };
  }

  if (kind === 'grid') {
    const lines = [];
    const horizon = h * 0.55;
    for (let i = 0; i <= 14; i += 1) {
      const x = (w / 14) * i;
      lines.push(`<line x1="${w / 2}" y1="${horizon}" x2="${x}" y2="${h}" stroke="rgba(255,255,255,0.12)"/>`);
    }
    for (let i = 1; i <= 10; i += 1) {
      const y = horizon + Math.pow(i / 10, 2) * (h - horizon);
      lines.push(`<line x1="0" y1="${y.toFixed(1)}" x2="${w}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,${(0.04 + i * 0.012).toFixed(3)})"/>`);
    }
    return {
      defs: glow,
      body: `${lines.join('\n  ')}
  <rect width="${w}" height="${h}" fill="url(#glo)" opacity="0.75"/>
  <rect y="${horizon - 1}" width="${w}" height="2" fill="${accent}" opacity="0.35"/>`,
    };
  }

  if (kind === 'rings') {
    const rings = [];
    for (let i = 1; i <= 8; i += 1) {
      rings.push(`<circle cx="${w / 2}" cy="${h / 2}" r="${(Math.min(w, h) / 18) * i}" stroke="rgba(255,255,255,${(0.16 - i * 0.012).toFixed(3)})" stroke-dasharray="${i % 2 ? '3 9' : '1 0'}"/>`);
    }
    return {
      defs: glow,
      body: `${rings.join('\n  ')}
  <circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) / 7}" fill="url(#glo)" opacity="0.9"/>`,
    };
  }

  if (kind === 'waves') {
    const paths = [];
    for (let i = 0; i < 12; i += 1) {
      const yy = h * 0.35 + i * (h * 0.045);
      paths.push(`<path d="M0 ${yy} C ${w * 0.25} ${yy - 60}, ${w * 0.55} ${yy + 60}, ${w} ${yy - 10}" stroke="rgba(255,255,255,${(0.05 + i * 0.02).toFixed(3)})" stroke-width="${i === 5 ? 2 : 1}"/>`);
    }
    return {
      defs: glow,
      body: `${paths.join('\n  ')}
  <rect width="${w}" height="${h}" fill="url(#glo)" opacity="0.5"/>`,
    };
  }

  if (kind === 'beam') {
    return {
      defs: glow,
      body: `<path d="M${w * 0.1} 0 L${w * 0.62} 0 L${w * 0.24} ${h} L${w * 0.02} ${h} Z" fill="url(#glo)" opacity="0.55"/>
  <path d="M${w * 0.3} 0 L${w * 0.34} 0 L${w * 0.1} ${h} L${w * 0.06} ${h} Z" fill="${accent}" opacity="0.25"/>
  <circle cx="${w * 0.72}" cy="${h * 0.34}" r="${Math.min(w, h) * 0.16}" fill="url(#glo)"/>`,
    };
  }

  // blob
  return {
    defs: glow,
    body: `<ellipse cx="${w * 0.35}" cy="${h * 0.45}" rx="${w * 0.34}" ry="${h * 0.34}" fill="url(#glo)" transform="rotate(-18 ${w * 0.35} ${h * 0.45})"/>
  <ellipse cx="${w * 0.7}" cy="${h * 0.7}" rx="${w * 0.22}" ry="${h * 0.18}" fill="${accent}" opacity="0.16" transform="rotate(24 ${w * 0.7} ${h * 0.7})"/>
  <circle cx="${w * 0.66}" cy="${h * 0.28}" r="${Math.min(w, h) * 0.06}" fill="none" stroke="rgba(255,255,255,0.3)"/>`,
  };
}

function make(file, kind, w, h, accent, label, sub) {
  const { defs, body } = scene(kind, w, h, accent);
  const svg = frame({ w, h, body: `<defs>${defs}</defs>\n  ${body}`, label, sub });
  fs.writeFileSync(path.join(outDir, file), svg, 'utf8');
}

const fire = '#FF4500';
const blue = '#1E90FF';

// Galeri
make('gallery-01.svg', 'embers', 900, 1200, fire, 'FIRE / NIGHT DRILL', 'ANKARA · 03:00');
make('gallery-02.svg', 'grid', 1200, 900, blue, 'DISPATCH / CONTROL', 'INCIDENT MANAGEMENT');
make('gallery-03.svg', 'rings', 900, 900, fire, 'IPEK BACA / CRM', 'FIELD OPERATIONS');
make('gallery-04.svg', 'beam', 1200, 1000, fire, 'EQUIPMENT CHECK', 'PRE-WINTER INSPECTION');
make('gallery-05.svg', 'blob', 900, 1100, '#FF6B35', 'FIELD NOTES', 'NOTEBOOK / 2025');
make('gallery-06.svg', 'waves', 1200, 800, blue, 'NETWORK MAINTENANCE', 'NIGHT SHIFT');

// Makale kapakları (16:9)
make('cover-01.svg', 'grid', 1200, 675, fire, 'SOFTWARE / FIELD', 'TECHNOLOGY');
make('cover-02.svg', 'waves', 1200, 675, blue, 'PUBLIC ADMIN', 'DIGITALISATION');
make('cover-03.svg', 'embers', 1200, 675, fire, 'FIRE / COMMAND', 'EMERGENCY');
make('cover-04.svg', 'rings', 1200, 675, blue, 'TECHNICAL DEBT', 'PRODUCT');
make('cover-05.svg', 'blob', 1200, 675, '#FF6B35', 'PERSONAL', 'ENGINEERING');

// Proje görselleri (16:10)
make('project-01.svg', 'rings', 1200, 750, '#FF6B35', 'IPEK BACA CRM', 'NEXT.JS · POSTGRESQL');
make('project-02.svg', 'grid', 1200, 750, blue, 'SIMALOGISTIC SAAS', 'NEXT.JS · TYPESCRIPT');
make('project-03.svg', 'beam', 1200, 750, fire, 'FIELD OPS MODULE', 'PILOT');

// Favicon
fs.writeFileSync(
  path.join(process.cwd(), 'public', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#000"/>
  <path d="M32 12c7 9 11 14 11 21a11 11 0 1 1-22 0c0-7 4-12 11-21Z" fill="#FF4500"/>
  <path d="M32 30c3 4 5 6 5 9a5 5 0 1 1-10 0c0-3 2-5 5-9Z" fill="#FFB27A"/>
</svg>`,
  'utf8',
);

console.log('placeholders written to public/images');
