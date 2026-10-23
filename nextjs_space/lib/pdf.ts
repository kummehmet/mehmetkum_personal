export type PdfLine = {
  text: string;
  size?: number;
  bold?: boolean;
  gap?: number;
  color?: [number, number, number];
};

const CUSTOM_GLYPHS: Record<string, number> = {
  'ş': 0x86,
  'Ş': 0x87,
  'ğ': 0x88,
  'Ğ': 0x89,
  'ı': 0x8a,
  'İ': 0x8b,
};

const CP1252: Record<string, number> = {
  '–': 0x96,
  '—': 0x97,
  '‘': 0x91,
  '’': 0x92,
  '“': 0x93,
  '”': 0x94,
  '•': 0x95,
  '…': 0x85,
  '·': 0xb7,
  '€': 0x80,
  '™': 0x99,
};

function encodeText(text: string): Buffer {
  const bytes: number[] = [];
  for (const char of text) {
    if (CUSTOM_GLYPHS[char] !== undefined) {
      bytes.push(CUSTOM_GLYPHS[char]);
      continue;
    }
    if (CP1252[char] !== undefined) {
      bytes.push(CP1252[char]);
      continue;
    }
    const code = char.codePointAt(0) ?? 63;
    bytes.push(code < 256 ? code : 63);
  }
  return Buffer.from(bytes);
}

function escapeBytes(bytes: Buffer): Buffer {
  const out: number[] = [];
  for (const byte of bytes) {
    if (byte === 0x5c || byte === 0x28 || byte === 0x29) out.push(0x5c);
    out.push(byte);
  }
  return Buffer.from(out);
}

/**
 * Bağımlılıksız, tek sayfalık PDF üreticisi (Helvetica + WinAnsiEncoding,
 * Türkçe karakterler için Differences haritası).
 */
export function buildPdf(lines: PdfLine[]): Buffer {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 56;

  const ops: string[] = [];
  let y = pageHeight - margin;

  for (const line of lines) {
    const size = line.size ?? 10;
    const leading = line.gap ?? size * 1.45;
    y -= leading;
    if (y < margin) break;

    const font = line.bold ? '/F2' : '/F1';
    const [r, g, b] = line.color ?? [0.08, 0.08, 0.09];
    const text = escapeBytes(encodeText(line.text)).toString('latin1');
    ops.push(
      `BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${margin} ${y.toFixed(2)} Tm (${text}) Tj ET`,
    );
  }

  const stream = ops.join('\n');
  const encoding =
    '<< /Type /Encoding /BaseEncoding /WinAnsiEncoding /Differences [ 134 /scedilla 135 /Scedilla 136 /gbreve 137 /Gbreve 138 /dotlessi 139 /Idotaccent ] >>';

  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding ${encoding} >>`,
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding ${encoding} >>`,
  ];

  const chunks: Buffer[] = [];
  let offset = 0;
  const push = (data: Buffer) => {
    chunks.push(data);
    offset += data.length;
  };

  push(Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'latin1'));

  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets[index + 1] = offset;
    push(Buffer.from(`${index + 1} 0 obj\n${body}\nendobj\n`, 'latin1'));
  });

  const xrefOffset = offset;
  const count = objects.length + 1;
  let xref = `xref\n0 ${count}\n0000000000 65535 f \n`;
  for (let i = 1; i < count; i += 1) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  push(Buffer.from(xref, 'latin1'));

  return Buffer.concat(chunks);
}
